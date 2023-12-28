import {z} from 'zod'

const orderDetailValidation = z.object({
userId : z.number(),
status : z.string(),

})


export default orderDetailValidation