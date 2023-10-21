import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import Validator from "../../src/application/contracts/utils/validator"
import SignupUserService from "../../src/application/services/users/signup"
import SignupUser from "../../src/domain/use-cases/signup-user"
import InMemoryUserRepository from "../../src/infra/repositories/in-memory/user-repository"
import BcryptEncrypt from "../../src/infra/utils/bcrypt-encrypter"
import ZodUserValidator from "../../src/infra/utils/validators/zod/user-validator"

type user_input = {
    name: string,
    email: string,
    password: string
}

let zod_user_validator: Validator<user_input>
let memory_user_repository: UserRepository
let bcrypt_encrypter: Encrypter
let signup_user_service: SignupUser

describe('Signup user', () => {

    beforeEach(() => {
        zod_user_validator = new ZodUserValidator()
        memory_user_repository = new InMemoryUserRepository()
        bcrypt_encrypter = new BcryptEncrypt()
        signup_user_service = new SignupUserService(zod_user_validator, memory_user_repository, bcrypt_encrypter)
    })

    it('Usuário deve ser cadastrado com sucesso', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123'
        }
        try{
            await signup_user_service.execute(new_user)
        }catch{
            fail()
        }
        
    })
})