import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import JWTHandler from "../../src/application/contracts/utils/jwt-handler"
import Validator from "../../src/application/contracts/utils/validator"
import LoginUserService from "../../src/application/services/users/login"
import SignupUserService from "../../src/application/services/users/signup"
import LoginUser from "../../src/domain/use-cases/users/login"
import SignupUser from "../../src/domain/use-cases/users/signup"
import InMemoryUserRepository from "../../src/infra/repositories/in-memory/user-repository"
import BcryptEncrypt from "../../src/infra/utils/bcrypt-encrypter"
import ConcreteJWTHandler from "../../src/infra/utils/concrete-jwt-handler"
import ZodUserValidator from "../../src/infra/utils/validators/zod/user-validator"

type validator_input = {
    name?: string;
    email?: string;
    phone_number?: string;
    cpf?: string;
    password?: string;
}

let memory_user_repository: UserRepository
let bcrypt_encrypter: Encrypter
let jwt_handler: JWTHandler
let zod_user_validator: Validator<validator_input>
let signup_user_service: SignupUser
let login_user_service: LoginUser

describe('Login user', () => {

    beforeEach(async () => {
        memory_user_repository = new InMemoryUserRepository()
        zod_user_validator = new ZodUserValidator()
        bcrypt_encrypter = new BcryptEncrypt()
        jwt_handler = new ConcreteJWTHandler()
        signup_user_service = new SignupUserService(zod_user_validator, memory_user_repository, bcrypt_encrypter)
        login_user_service = new LoginUserService(memory_user_repository, bcrypt_encrypter, jwt_handler)

        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }

        await signup_user_service.execute(new_user)
    })

    it('Login deve obter sucesso', async () => {
        const login_user = {
            email: 'vitor@gmail.com',
            password: 'teste123'
        }

        const token = await login_user_service.execute(login_user)
        const user = await memory_user_repository.find_by_email(login_user.email)
        if(!user) fail()

        const user_info = jwt_handler.validate(token)

        expect(user_info).toBe(user.id)
    })
    it('Deve lançar erro de senha incorreta', async () => {
        const login_user = {
            email: 'vitor@gmail.com',
            password: 'teste12'
        }        

        await expect(login_user_service.execute(login_user)).rejects.toThrow(new Error("Senha incorreta."))
    })
    it('Deve lançar erro de usuário não existe', async () => {
        const login_user = {
            email: 'vit@gmail.com',
            password: 'teste123'
        }        

        await expect(login_user_service.execute(login_user)).rejects.toThrow(new Error("Usuário não existe."))
    })
})