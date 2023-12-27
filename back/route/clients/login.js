import express from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import uservalidation from "../clients/validatorsForm.js";
const router = express.Router();
const prisma = new PrismaClient();
import createError from "http-errors";


router.post("/login", async (req, res, next) => {
  let loginData;
  try{
    loginData =  uservalidation.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const user = await prisma.user.findFirst({
    where:{
        email:loginData.email
    }
  })

  if(!user) return next(createError(403, "Mauvais mot de passe/email"))

  const passwordIsGood = await bcrypt.compare(loginData.password, user.password)

  if(!passwordIsGood) return next(createError(403, "Mauvais mot de passe/email"))

  res.json({
    token : jwt.sign({
        id : user.id,
        email: user.email
    },
    process.env["JWT_KEY"], {
        expiresIn : 86400,
    })
  })
});


export default router