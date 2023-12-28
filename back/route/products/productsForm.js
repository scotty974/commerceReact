import {string, z} from 'zod'

const productForm = z.object({
    name: z.string(),
    description : z.string(),
    price : z.number(),
    stockQuantity : z.number(),
    status : z.string(),
    category : z.number(),

})

export default productForm