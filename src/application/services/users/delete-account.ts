import DeleteAccount from "../../../domain/use-cases/users/delete-account";
import UserRepository from "../../contracts/repositories/user-repository";

export default class DeleteAccountService implements DeleteAccount {

    constructor(
        private readonly user_repository: UserRepository
    ){}

    async execute(id: string): Promise<void>{
        if(!id) throw new Error('Identificador do usuário é obrigatório')

        if(!this.user_repository.valid_id(id)) throw new Error('ID inválido')

        const user = await this.user_repository.find_by_id(id)

        if(!user) throw new Error('Usuário não existe')

        await this.user_repository.delete(id)
    }
}