import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import * as dotenv from "dotenv";
import cors from "cors";
import { CreateProduct, PatchProdcut } from "./structs.js";
dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: [
      "https://4-sprint-mission-fe-c56s.vercel.app",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      switch (e.name) {
        case "ValidationError":
          res.status(400).send({ message: e.message });
          break;
        case "CastError":
          res.status(404).send({ message: "Cannot find given id" });
          break;
        default:
          res.status(500).send({ message: e.message });
          break;
      }
    }
  };
};

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const {
      orderBy = "recent",
      page = 1,
      pageSize = 10,
      keyword = "",
    } = req.query;
    const offset = (page - 1) * pageSize;

    if (page < 1 || pageSize < 1) {
      return res.status(400).send({
        message: "Page and limit is less than 1",
      });
    }

    const sortOption =
      orderBy === "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" };

    const search = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const products = await prisma.product
      .find(search)
      .select("name price createdAt favoriteCount")
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize);

    const totalCount = await prisma.product.countDocuments(search);

    res.send({ list: products, totalCount });
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findById(id).select("-updatedAt");
    res.send(product);
  })
);

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create(req.body);
    res.status(201).send(product);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProdcut);
    const id = req.params.id;
    const product = await prisma.product.findById(id);
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    product.updatedAt = new Date();
    await product.save();

    res.send(product);
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await prisma.product.findByIdAndDelete(id);
    res.sendStatus(204);
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
