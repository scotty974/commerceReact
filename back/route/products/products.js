import express from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";
import productForm from "./productsForm.js";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/products", async (req, res, next) => {
  let productdata;
  try {
    productdata = productForm.parse(req.body);
  } catch (error) {
    return next(createError(500, "Erreur serveur"));
  }

  await prisma.products.create({
    data: {
      name: productdata.name,
      description: productdata.description,
      price: productdata.price,
      stockQuantity: productdata.stockQuantity,
      status: productdata.status,
      categoryId: productdata.category,
    },
  });
  return res
    .status(200)
    .json({
      status: "success",
      message: `Ajout du produit :  ${productdata.name}`,
    });
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany({
      include : {
        category : {
            
        }
      }
    });
    res.json(products);
  } catch (error) {
    return next(createError(500, "Erreur serveur"));
  }
});

export default router;
