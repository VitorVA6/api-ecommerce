import Validator from "../../../../application/contracts/utils/validator";
import {z, ZodError} from 'zod'

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
        try{

            user_schema.parse({name, email, password})
        }catch(err){
            if(err instanceof ZodError) throw new Error(err.errors[0].message)
        }
    }

}