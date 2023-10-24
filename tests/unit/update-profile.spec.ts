import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import Validator from "../../src/application/contracts/utils/validator"
import SignupUserService from "../../src/application/services/users/signup"
import UpdateProfileService from "../../src/application/services/users/update-profile"
import { User } from "../../src/domain/entities/user"
import SignupUser from "../../src/domain/use-cases/users/signup"
import UpdateProfile from "../../src/domain/use-cases/users/update-profile"
import InMemoryUserRepository from "../../src/infra/repositories/in-memory/user-repository"
import BcryptEncrypt from "../../src/infra/utils/bcrypt-encrypter"
import ZodUserValidator from "../../src/infra/utils/validators/zod/user-validator"

type validator_input = {
    name?: string;
    email?: string;
    phone_number?: string;
    cpf?: string;
    password?: string;
}

let zod_user_validator: Validator<validator_input>
let memory_user_repository: UserRepository
let bcrypt_encrypter: Encrypter
let signup_user_service: SignupUser
let update_profile_service: UpdateProfile
let user: User

describe('Update profile', () => {

    beforeEach(async () => {
        memory_user_repository = new InMemoryUserRepository()
        zod_user_validator = new ZodUserValidator()
        bcrypt_encrypter = new BcryptEncrypt()
        signup_user_service = new SignupUserService(zod_user_validator, memory_user_repository, bcrypt_encrypter)
        update_profile_service = new UpdateProfileService(
            zod_user_validator, 
            memory_user_repository, 
            bcrypt_encrypter
        )
        const new_user = {
            name: 'Vitor',
            email: 'vitor@gmail.com',
            password: 'teste123',
            phone_number: '(73) 98122-1363',
            cpf: '066.533.075-81'
        }

        user = await signup_user_service.execute(new_user)
    })

    it('Usuário deve ser atualizado com sucesso', async () => {
        try{
            await update_profile_service.execute({
                id: user.id!,
                name: 'Andrew Garfield',
                phone_number: '(75) 99999-9999',
                cpf: '666.888.444-00'}
            )
        }catch(err){
            fail()
        }
    })
    it('Deve lançar erro de ID inválido', async () => {
        await expect(update_profile_service.execute({
            id: 'adfa',
            name: 'Andrew Garfield',
            phone_number: '(75) 99999-9999',
            cpf: '666.888.444-00'})).rejects.toThrow(new Error('ID inválido.')) 
    })
    it('Deve lançar erro de nova senha obrigatório se a senha antiga for enviada', async () => {
        await expect(update_profile_service.execute({
            id: user.id!,
            name: 'Andrew Garfield',
            phone_number: '(75) 99999-9999',
            cpf: '666.888.444-00',
            password: 'senhateste'
        })).rejects.toThrow(new Error("Nova senha é obrigatória."))
    })
    it('Deve lançar erro de nova senha inválida', async () => {
        await expect(update_profile_service.execute({
            id: user.id!,
            name: 'Andrew Garfield',
            phone_number: '(75) 99999-9999',
            cpf: '666.888.444-00',
            password: 'senhateste',
            new_password: 'aasd'
        })).rejects.toThrow(new Error("Senha deve ter no mínimo 8 caracteres."))
    })
    it('Deve lançar erro de senha incorreta', async () => {
        await expect(update_profile_service.execute({
            id: user.id!,
            name: 'Andrew Garfield',
            phone_number: '(75) 99999-9999',
            cpf: '666.888.444-00',
            password: 'senhateste',
            new_password: 'senhashopee'
        })).rejects.toThrow(new Error("Senha incorreta."))
    })
})