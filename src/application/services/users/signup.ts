import { User } from "../../../domain/entities/user";
import ISignupUser from "../../../domain/use-cases/users/signup";
import IUserRepository from "../../contracts/repositories/user-repository";
import IEncrypter from "../../contracts/utils/encrypter";
import IValidator from "../../contracts/utils/validator";

type input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

type validator_input = {
    name?: string;
    email?: string;
    phone_number?: string;
    cpf?: string;
    password?: string;
}

export default class SignupUserService implements ISignupUser{
    constructor(
        private readonly user_validator: IValidator<validator_input>,
        private readonly user_repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ){}

    async execute({name, email, password, phone_number, cpf}: input): Promise<User>{

        if(!name || !email || !password || !phone_number || !cpf) throw new Error("Preencha todos os campos")
        
        this.user_validator.validate({name, email, password, phone_number, cpf})
        
        let new_user: User = {
            name, 
            email, 
            password,
            phone_number,
            cpf,
            role: 'user',
            email_reset_token: undefined,
            password_reset_token: undefined
        }

        const email_exists = await this.user_repository.find_by_email(email)

        if(email_exists) throw new Error('E-mail já está em uso.')

        const hash_password = await this.encrypter.encrypt(password)
        new_user.password = hash_password

        const user = await this.user_repository.create(new_user)
        return user
    }
}