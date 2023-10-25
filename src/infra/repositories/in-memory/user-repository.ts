import IUserRepository from "../../../application/contracts/repositories/user-repository";
import { UserModel } from "../../../application/models/User";
import { v4 as uuid, validate } from 'uuid';

export default class InMemoryUserRepository implements IUserRepository {
    
    private users: UserModel[] = []
    
    valid_id(id: string): boolean {
        return validate(id)
    }

    async create(input: UserModel): Promise<UserModel> {
        const new_user = {
            id: uuid(),
            ...input
        }
        await this.users.push(new_user)
        return new_user
    }

    async find_by_id(id: string): Promise<UserModel | undefined> {
        const user = await this.users.find(el => el.id === id)
        return user
    }

    async find_by_email(email: string): Promise<UserModel | undefined> {
        const user = await this.users.find(el => el.email === email)
        return user
    }

    async update(input: UserModel): Promise<void> {
        this.users = await this.users.map(el => {
            if(el.id === input.id){
                return ({
                    ...input
                })
            }
            return el
        })
    }

    async delete(id: string): Promise<void> {
        this.users = await this.users.filter(el => el.id !== id)
    }
}