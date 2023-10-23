import Validator from "../../../../application/contracts/utils/validator";
import {z, ZodError} from 'zod'

type input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

export default class ZodUserValidator implements Validator<input> {

    validate({name, email, password, phone_number, cpf}: input): void{
        
        const user_schema = z.object({
            name: z.string().min(5, {message: 'Nome inválido.'}),
            email: z.string().email({message: 'Formato de e-mail inválido.'}),
            password: z.string().min(8, {message: 'Senha deve ter no mínimo 8 caracteres.'}),
            phone_number: z.string()
                .refine(value=>/^\(\d{2}\) \d{4,5}-\d{4}$/.test(value), {message: 'Número de celular inválido'}),
            cpf: z.string()
                .refine(value=>/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value), {message: 'CPF inválido'}),
        })
        try{

            user_schema.parse({name, email, password, phone_number, cpf})
        }catch(err){
            if(err instanceof ZodError) throw new Error(err.errors[0].message)
        }
    }

}