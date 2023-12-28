import express from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";
import { expressjwt } from "express-jwt";
import reviewValidation from "./reviewForm.js";
const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

router.post("/review", auth, async (req, res, next) => {
  let reviewData;
  try {
    reviewData = reviewValidation.parse(req.body);
    const productExisting = await prisma.products.findFirst({
      where: {
        id: reviewData.productId,
      },
    });

    if (!productExisting) {
      return res
        .status(404)
        .json({ status: "error", message: "Ce produit est inaccessible" });
    }
  } catch (error) {
    return next(createError.BadRequest("Invalid data"));
  }

  await prisma.review.create({
    data: {
      userid: reviewData.userId,
      productid: reviewData.productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString(),
    },
  });
  return res
    .status(200)
    .json({ status: "success", message: "Création du commentaire" });
});

router.get("/review", auth, async (req, res, next) => {
  try {
    const review = await prisma.review.findMany({
      include: {
        user: {
            select : {
                firstName: true,
                lastName: true,
            }
          
        },
      },
    });
    res.json(review);
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Impossible de recupérer les commentaires",
      });
  }
});

export default router;
