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
/*********** products ***********/
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
        message: "Page and limit must be greater than 0",
      });
    }

    const sortOption =
      orderBy === "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" };

    const search = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
      where: search,
      select: {
        name: true,
        price: true,
        createdAt: true,
        favoriteCount: true,
      },
      orderBy: sortOption,
      skip: parseInt(offset),
      take: parseInt(pageSize),
    });
    const totalCount = await prisma.product.count({
      where: search,
    });

    res.send({ list: products, totalCount });
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        favoriteCount: true,
        images: true,
        createdAt: true,
      },
    });
    res.send(product);
  })
);

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({ data: { ...req.body } });
    res.status(201).send(product);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProdcut);
    const id = req.params.id;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...req.body,
      },
    });

    res.send(product);
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

/*********** articles ***********/

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
