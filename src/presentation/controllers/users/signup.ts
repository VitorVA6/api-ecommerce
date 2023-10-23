import SignupUserService from "../../../application/services/users/signup";
import Controller from "../../contracts/controller";
import { HttpRequest, HttpResponse } from "../../contracts/http";

type body = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

type ResponseData = {
    message: string
}

export default class SignupUserController implements Controller {
    constructor(private readonly signup_user_service: SignupUserService) {}

    async handle(http_request: HttpRequest<body, undefined>): Promise<HttpResponse<ResponseData>>{
        const {name, email, password, phone_number, cpf} = http_request.body

        try{
            await this.signup_user_service.execute({name, email, password, phone_number, cpf})
    
            return {
                status_code: 200,
                data: {
                    message: 'Usuário criado com sucesso.'
                }
            }
        }catch(err){
            console.log(err)
            return {
                status_code: 500,
                data: {
                    message: 'Erro na criação do usuário.'
                }
            }
        }

    }
}