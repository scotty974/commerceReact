import express from "express";
import bcrypt from "bcrypt";
import profilValidation from "./profilForm.js";
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

router.patch('/customers/:id', async (req, res, next) => {
  let userData;
  // On vérifie que l'utilisateur est bien le propriétaire du compte qu'il veut modifier
  const userId = parseInt(req.params.id);

  try {
    userData =  profilValidation.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }

    console.log(userData);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      },
    });

    return res.status(200).json({ status: 'success', message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Une erreur est survenue lors de la mise à jour du profil' });
  }
});


export default router