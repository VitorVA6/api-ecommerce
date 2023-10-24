import UserRepository from "../../src/application/contracts/repositories/user-repository"
import Encrypter from "../../src/application/contracts/utils/encrypter"
import Validator from "../../src/application/contracts/utils/validator"
import SignupUserService from "../../src/application/services/users/signup"
import UpdateProfileService from "../../src/application/services/users/update-profile"
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
    })

    it('Usuário deve ser atualizado com sucesso', async () => {
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
            console.log(user)
            if(!user) fail()
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

})