import express from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import  uservalidation  from "../clients/validatorsForm.js";
import { expressjwt  } from "express-jwt";
const router = express.Router();
const prisma = new PrismaClient();
import createError from "http-errors";

const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

router.post("/register", async (req, res, next) => {
  let registerData;
  try {
    registerData = await uservalidation.parse(req.body);
  } catch (error) {
    return res.status(400).send({ error: "Error in registration data" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: registerData.email,
    },
  });
  if (user)
    return next(createError(400, "Un compte existe déjà avec cette email ! "));

  const hashedPassword = await bcrypt.hash(registerData.password, 10);

  await prisma.user
    .create({
      data: {
        email: registerData.email,
        password: hashedPassword,
      },
    })
    .then((user) => {
      res.json({
        token: jwt.sign(
          {
            email: user.email,
          },
          process.env["JWT_KEY"],
          {
            expiresIn: 86400, // 24h
          }
        ),
      });
    });

    
});


export default router 