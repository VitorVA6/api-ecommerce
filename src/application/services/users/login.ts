import LoginUser from "../../../domain/use-cases/users/login";
import UserRepository from "../../contracts/repositories/user-repository";
import Encrypter from "../../contracts/utils/encrypter";
import JWTHandler from "../../contracts/utils/jwt-handler";

type input = {
    email: string,
    password: string
}

type output = {
    token: string,
    user_name: string
}

export default class LoginUserService implements LoginUser {

    constructor(
        private readonly user_repository: UserRepository,
        private readonly encryper: Encrypter,
        private readonly jwt_handler: JWTHandler
    ) {}

    async execute({email, password}: input): Promise<output>{
        if(!email || !password) throw new Error("E-mail e senha são obrigatórios.")

        const user = await this.user_repository.find_by_email(email)

        if(!user) throw new Error("Usuário não existe.")

        const password_matches = await this.encryper.check(password, user.password)

        if(!password_matches) throw new Error("Senha incorreta.")

        const token = await this.jwt_handler.token_generator(user.id!)

        return {
            token,
            user_name: user.name
        }
    }

}