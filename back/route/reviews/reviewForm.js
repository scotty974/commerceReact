import {z} from 'zod'

const reviewValidation = z.object({
    userId : z.number(),
    productId : z.number(),
    rating : z.number(),
    comment : z.string()
})


export default reviewValidation