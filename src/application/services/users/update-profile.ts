import IUpdateProfile, {update_props} from "../../../domain/use-cases/users/update-profile";
import IBcryptEncrypt from "../../../infra/utils/bcrypt-encrypter";
import IUserRepository from "../../contracts/repositories/user-repository";
import IValidator from "../../contracts/utils/validator";

type validator_input = {
    name?: string;
    email?: string;
    phone_number?: string;
    cpf?: string;
    password?: string;
}

export default class UpdateProfileService implements IUpdateProfile {
    constructor(
        private readonly user_validator: IValidator<validator_input>,
        private readonly user_repository: IUserRepository,
        private readonly encrypter: IBcryptEncrypt
    ){}

    async execute({id, name, phone_number, cpf, password, new_password}: update_props): Promise<void>{
        if(!id) throw new Error('Identificador do usuário é obrigatório')
        
        if(!name || !phone_number || !cpf) throw new Error("Preencha todos os campos.")

        if(password && !new_password) throw new Error("Nova senha é obrigatória.")

        if(!this.user_repository.valid_id(id)) throw new Error('ID inválido.')
        this.user_validator.validate({name, password: new_password, cpf})

        const user = await this.user_repository.find_by_id(id)
        if(!user) throw new Error('Usuário não existe')

        user.name = name
        user.cpf = cpf
        user.phone_number = phone_number

        if(password && new_password){
            const password_match = await this.encrypter.check(password, user.password)
            if(!password_match) throw new Error('Senha incorreta.')
            const hash_password = await this.encrypter.encrypt(new_password)
            user.password = hash_password
        }
        
        await this.user_repository.update(user)
    }
}