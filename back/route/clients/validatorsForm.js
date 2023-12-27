import {z} from 'zod'

const uservalidation = z.object({
    email : z.string(),
    password : z.string().max(12)
})

export default uservalidation