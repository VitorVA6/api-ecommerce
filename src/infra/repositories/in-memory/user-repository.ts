import UserRepository from "../../../application/contracts/repositories/user-repository";
import { User } from "../../../domain/entities/user";
import { v4 as uuid } from 'uuid';

type update_props = {
    id: string,
    name: string,
    email: string,
    password: string
}

export default class InMemoryUserRepository implements UserRepository {

    private users: User[] = []

    async create(input: User): Promise<void> {
        const new_user = {
            id: uuid(),
            ...input
        }
        await this.users.push(new_user)
    }

    async find_by_id(id: string): Promise<User | undefined> {
        const user = await this.users.find(el => el.id === id)
        return user
    }

    async find_by_email(email: string): Promise<User | undefined> {
        const user = await this.users.find(el => el.email === email)
        return user
    }

    async update({id, name, email, password}: update_props): Promise<void> {
        this.users = await this.users.map(el => {
            if(el.id === id){
                return ({
                    ...el,
                    name,
                    email,
                    password
                })
            }
            return el
        })
    }

    async delete(id: string): Promise<void> {
        this.users = await this.users.filter(el => el.id !== id)
    }

}