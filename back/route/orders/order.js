import express from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";
import orderForm from './orderForm.js'
import { expressjwt } from "express-jwt";
const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
    secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
})

router.post('/order', auth, async(req,res,next)=>{
    let orderData;
    try{
        orderData =  orderForm.parse(req.body)
    }catch(error){
        return next(createError.BadRequest('Invalid data'));
    }

   
    await prisma.order.create({
       data : {
        userId : orderData.userId,
        orderDate : new Date().toISOString() ,
        status : orderData.status
       }
    })
    return res.status(200).json({ status: 'success', message: 'Création de la commande' });
})


router.get('/order', auth, async(req,res,next)=>{
    try{
        const orders = await prisma.order.findMany({
            include : {
                orderdetail : {
                    include : {
                        product : {}
                    }
                }
            }
        })
        res.json(orders)
    }catch(error){
        return res.status(500).json({ status: 'error', message: 'Impossible de recupérer le panier' });
    }
})


export default router