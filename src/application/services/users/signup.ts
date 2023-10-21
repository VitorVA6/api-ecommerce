import { User } from "../../../domain/entities/user";
import SignupUser from "../../../domain/use-cases/signup-user";
import UserRepository from "../../contracts/repositories/user-repository";
import Encrypter from "../../contracts/utils/encrypter";
import Validator from "../../contracts/utils/validator";

export default class SignupUserService implements SignupUser{
    constructor(
        private readonly user_validator: Validator<User>,
        private readonly user_repository: UserRepository,
        private readonly encrypter: Encrypter
    ){}

    async execute({name, email, password, role}: User): Promise<void>{
        this.user_validator.validate({name, email, password, role})

        const email_exists = await this.user_repository.find_by_email(email)

        if(email_exists) throw new Error('E-mail já está em uso.')

        const hash_password = await this.encrypter.encrypt(password)

        await this.user_repository.create({
            name, 
            email, 
            password: hash_password, 
            role,
            email_reset_token: undefined,
            password_reset_token: undefined
        })
    }
}