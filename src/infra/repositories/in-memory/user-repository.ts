import IUserRepository from "../../../application/contracts/repositories/user-repository";
import { UserModel } from "../../../application/models/User";
import { User } from "../../../domain/entities/user";
import { v4 as uuid, validate } from 'uuid';

type update_props = {
    id: string;
    name: string;
    phone_number: string;
    cpf: string;
    password?: string;
    confirm_password?: string;
}

export default class InMemoryUserRepository implements IUserRepository {
    
    private users: User[] = []
    
    valid_id(id: string): boolean {
        return validate(id)
    }

    async create(input: User): Promise<UserModel> {
        const new_user = {
            id: uuid(),
            ...input
        }
        await this.users.push(new_user)
        return new_user
    }

    async find_by_id(id: string): Promise<User | undefined> {
        const user = await this.users.find(el => el.id === id)
        return user
    }

    async find_by_email(email: string): Promise<User | undefined> {
        const user = await this.users.find(el => el.email === email)
        return user
    }

    async update({id, name, cpf, phone_number}: update_props): Promise<void> {
        this.users = await this.users.map(el => {
            if(el.id === id){
                return ({
                    ...el,
                    name,
                    cpf,
                    phone_number
                })
            }
            return el
        })
    }

    async delete(id: string): Promise<void> {
        this.users = await this.users.filter(el => el.id !== id)
    }
}