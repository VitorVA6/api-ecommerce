import { User } from "../../../domain/entities/user";
import SignupUser from "../../../domain/use-cases/users/signup";
import UserRepository from "../../contracts/repositories/user-repository";
import Encrypter from "../../contracts/utils/encrypter";
import Validator from "../../contracts/utils/validator";

type input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

export default class SignupUserService implements SignupUser{
    constructor(
        private readonly user_validator: Validator<input>,
        private readonly user_repository: UserRepository,
        private readonly encrypter: Encrypter
    ){}

    async execute({name, email, password, phone_number, cpf}: input): Promise<void>{
        
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

        await this.user_repository.create(new_user)
    }
}