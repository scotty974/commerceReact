import {z} from 'zod'

const orderDetailValidation = z.object({
orderId : z.number(),
productId : z.number(),
quantity : z.number(),
total : z.number(),
})


export default orderDetailValidation