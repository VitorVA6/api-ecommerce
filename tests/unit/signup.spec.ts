import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import Validator from "../../src/application/contracts/utils/validator"
import SignupUserService from "../../src/application/services/users/signup"
import SignupUser from "../../src/domain/use-cases/users/signup"
import InMemoryUserRepository from "../../src/infra/repositories/in-memory/user-repository"
import BcryptEncrypt from "../../src/infra/utils/bcrypt-encrypter"
import ZodUserValidator from "../../src/infra/utils/validators/zod/user-validator"

type user_input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
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
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }
        try{
            await signup_user_service.execute(new_user)
        }catch{
            fail()
        }
    })
    it('Deve lançar erro de email em formato inválido', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vva@g',
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }
        await expect(signup_user_service.execute(new_user)).rejects.toThrow(new Error('Formato de e-mail inválido.'))
    })
    it('Deve lançar erro de password inválido', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste12',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }
        await expect(signup_user_service.execute(new_user)).rejects.toThrow(new Error('Senha deve ter no mínimo 8 caracteres.'))
    })
    it('Deve lançar erro de e-mail existente', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }
        await signup_user_service.execute(new_user)
        await expect(signup_user_service.execute(new_user)).rejects.toThrow(new Error('E-mail já está em uso.'))
    })
    it('Deve lançar erro de número de celular inválido', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123',
            phone_number: '(73) 98122-136',
            cpf: '066.533.075-81'
        }
        await expect(signup_user_service.execute(new_user)).rejects.toThrow(new Error('Número de celular inválido.'))
    })
    it('Deve lançar erro de cpf inválido', async () => {
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-8'
        }
        await expect(signup_user_service.execute(new_user)).rejects.toThrow(new Error('CPF inválido.'))
    })
})