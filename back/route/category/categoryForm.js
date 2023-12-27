import {z} from 'zod'

const categoryValidation = z.object({
    name : z.string(),
    description : z.string(),

})

export default categoryValidation