import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import Validator from "../../src/application/contracts/utils/validator"
import DeleteAccountService from "../../src/application/services/users/delete-account"
import SignupUserService from "../../src/application/services/users/signup"
import DeleteAccount from "../../src/domain/use-cases/users/delete-account"
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
let delete_account_service: DeleteAccount

describe('Delete user', () => {

    beforeEach(async () => {
        memory_user_repository = new InMemoryUserRepository()
        zod_user_validator = new ZodUserValidator()
        bcrypt_encrypter = new BcryptEncrypt()
        signup_user_service = new SignupUserService(zod_user_validator, memory_user_repository, bcrypt_encrypter)
        delete_account_service = new DeleteAccountService(memory_user_repository)
    })

    it('Usuário deve ser deletado com sucesso', async () => {
        try{
            const new_user = {
                name: 'Vitor',
                email: 'vitor@gmail.com',
                password: 'teste123',
                phone_number: '(73) 98122-1363',
                cpf: '066.533.075-81'
            }
    
            await signup_user_service.execute(new_user)

            const user = await memory_user_repository.find_by_email('vitor@gmail.com')
            if(!user) fail()
            await delete_account_service.execute(user.id!)
        }catch{
            fail()
        }
    })
    it('Deve lançar erro de ID inválido', async () => {
        await expect(delete_account_service.execute('aadf'))
        .rejects.toThrow(new Error('ID inválido')) 
    })
    it('Deve lançar erro de ID inválido', async () => {
        await expect(delete_account_service.execute('4be3dc6e-3562-40b4-8eba-417715d85039'))
        .rejects.toThrow(new Error('Usuário não existe')) 
    })
})