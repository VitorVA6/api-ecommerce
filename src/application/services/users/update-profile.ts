import UpdateProfile from "../../../domain/use-cases/users/update-profile";
import BcryptEncrypt from "../../../infra/utils/bcrypt-encrypter";
import UserRepository from "../../contracts/repositories/user-repository";
import Validator from "../../contracts/utils/validator";

type update_props = {
    id: string;
    name: string;
    phone_number: string;
    cpf: string;
    password?: string;
    new_password?: string;
}

type validator_input = {
    name?: string;
    email?: string;
    phone_number?: string;
    cpf?: string;
    password?: string;
}

export default class UpdateProfileService implements UpdateProfile {
    constructor(
        private readonly user_validator: Validator<validator_input>,
        private readonly user_repository: UserRepository,
        private readonly encrypter: BcryptEncrypt
    ){}

    async execute({id, name, phone_number, cpf, password, new_password}: update_props): Promise<void>{
        if(!id) throw new Error('Identificador do usuário é obrigatório')
        
        if(!name || !phone_number || !cpf) throw new Error("Preencha todos os campos.")

        if(password && !new_password) throw new Error("Nova senha é obrigatória.")

        if(!this.user_repository.valid_id(id)) throw new Error('ID inválido.')
        this.user_validator.validate({name, password, cpf})

        const user = await this.user_repository.find_by_id(id)
        if(!user) throw new Error('Usuário não existe')

        if(password){
            const password_match = await this.encrypter.check(password, user.password)
            if(!password_match) throw new Error('Senha incorreta.')
            const hash_password = await this.encrypter.encrypt(password)
            user.password = hash_password
        }
        
        await this.user_repository.update({
            id,
            name,
            phone_number,
            cpf,
            password: user.password
        })
    }
}