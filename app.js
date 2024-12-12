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
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
};
/*********** products ***********/ //유효성 검사 추가하기
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
app.post(
  "/article",
  asyncHandler(async (req, res) => {
    const article = await prisma.article.create({
      data: { ...req.body },
    });
    res.status(204).send(article);
  })
);

app.get(
  "/article/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    });
    res.send(article);
  })
);

app.patch(
  "/article/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const article = await prisma.article.update({
      where: { id },
      data: { ...req.body },
    });
    res.send(article);
  })
);

app.delete(
  "/article/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/article",
  asyncHandler(async (req, res) => {
    const {
      orderBy = "recent",
      page = 1,
      pageSize = 10,
      keyword = "",
    } = req.query;

    if (page < 1 || pageSize < 1) {
      return res.status(400).send({
        message: "Page and limit is less than 1",
      });
    }

    const offset = (page - 1) * pageSize;

    const sortOption =
      orderBy === recent ? { createdAt: "desc" } : { createdAt: "asc" };
    const search = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};
    const articles = await prisma.article.findMany({
      where: { search },
      orderBy: sortOption,
      skip: parseInt(offset),
      take: parseInt(pageSize),
    });
    res.send(articles);
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
