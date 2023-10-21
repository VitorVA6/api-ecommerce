import Validator from "../../../../application/contracts/utils/validator";
import { UserModel } from "../../../../application/models/User";
import {z} from 'zod'

type input = {
    name: string,
    email: string,
    password: string
}

export default class ZodUserValidator implements Validator<input> {

    validate({name, email, password}: input): void{
        
        const user_schema = z.object({
            name: z.string().min(5),
            email: z.string().email(),
            password: z.string().min(8),
        })

        user_schema.parse({name, email, password})
    }

}