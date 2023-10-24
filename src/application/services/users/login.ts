import ILoginUser from "../../../domain/use-cases/users/login";
import IUserRepository from "../../contracts/repositories/user-repository";
import IEncrypter from "../../contracts/utils/encrypter";
import IJWTHandler from "../../contracts/utils/jwt-handler";

type input = {
    email: string,
    password: string
}

export default class LoginUserService implements ILoginUser {

    constructor(
        private readonly user_repository: IUserRepository,
        private readonly encryper: IEncrypter,
        private readonly jwt_handler: IJWTHandler
    ) {}

    async execute({email, password}: input): Promise<string>{
        if(!email || !password) throw new Error("E-mail e senha são obrigatórios.")

        const user = await this.user_repository.find_by_email(email)

        if(!user) throw new Error("Usuário não existe.")

        const password_matches = await this.encryper.check(password, user.password)

        if(!password_matches) throw new Error("Senha incorreta.")

        const token = this.jwt_handler.generate(user.id!)

        return token
    }
}