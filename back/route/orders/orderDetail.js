import express from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";
import orderDetailValidation from "./orderDetailForm.js";
import { expressjwt } from "express-jwt";
const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
    secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
})

router.post('/order-detail', auth, async(req,res,next)=>{
    let orderDetailData;
    try{
        orderDetailData =  orderDetailValidation.parse(req.body)
    }catch(error){
        return next(createError.BadRequest('Invalid data'));
    }

    await prisma.orderDetail.create({
        data : {
            orderId : orderDetailData.orderId,
            productId : orderDetailData.productId,
            quantity : orderDetailData.quantity,
            unitPriceAtOrder : orderDetailData.total
            
        },

        
    })
    return res.status(200).json({ status: 'success', message: 'Ajout au panier' });
})

router.delete('/order-detail/:id', auth, async (req, res, next) => {
const orderDetailId = parseInt(req.params.id)

    try {
        // Vérifiez si l'OrderDetail existe
        const existingOrderDetail = await prisma.orderDetail.findUnique({
            where: {
                id: parseInt(orderDetailId),
            },
        });

        if (!existingOrderDetail) {
            return next(createError.NotFound('OrderDetail introuvable'));
        }

        // Supprimez l'OrderDetail
        await prisma.orderDetail.delete({
            where: {
                id: parseInt(orderDetailId),
            },
        });

        return res.status(200).json({ status: 'success', message: 'OrderDetail supprimé avec succès' });
    } catch (error) {
        console.error(error);
        return next(createError.InternalServerError('Erreur lors de la suppression de l\'OrderDetail'));
    }
});




export default router