
import {z} from "zod"
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

const profilValidation = z.object({
    firstName: z.string(),
    lastName : z.string(),
    phoneNumber : z.string().regex(phoneRegex, 'invalid Number !'),
    address : z.string()
})

export default profilValidation