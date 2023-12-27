import express from 'express'
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";
import categoryValidation from './categoryForm.js';
const router = express.Router();
const prisma = new PrismaClient();


router.post('/category', async(req,res,next)=>{
let categoryData;
try{
    categoryData= categoryValidation.parse(req.body)
}catch(error){
return {error : error, message : "Une erreur est survenu"}
}

await prisma.category.create({
    data:{
        name: categoryData.name,
        description : categoryData.description
    }
})
return res.status(200).json({ status: 'success', message: `Ajout de la catégorie ${categoryData.name}` });
})


router.get('/category', async(req,res,next)=>{
    try{
       const categories= await prisma.category.findMany({})
       res.json(categories)
    }catch(error){
        return next(createError(500, "Erreur serveur"))
    }
})

// il faut faire la route pour trier par catégorie


export default router 