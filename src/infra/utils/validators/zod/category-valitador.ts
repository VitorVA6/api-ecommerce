import IValidator from "../../../../application/contracts/utils/validator";
import {z, ZodError} from 'zod'

type validate_props = {
    name?: string,
    url_img?: string
} 

export default class CategoryValidator implements IValidator<validate_props> {
    validate({name, url_img}: validate_props): void{
        const category_schema = z.object({
            name: z.string(),
            url_img: z.union([
                z.string().endsWith('.png'), 
                z.string().endsWith('.jpg'), 
                z.string().endsWith('.webp', {message: 'Formato de imagem inválido'})])
        })

        try{
            category_schema.parse({name, url_img})
        }catch(err){
            if(err instanceof ZodError) throw new Error(err.errors[0].message)
        }
    }
}