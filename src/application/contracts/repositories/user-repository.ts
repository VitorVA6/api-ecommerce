import { User } from "../../../domain/entities/user";

export default interface IUserRepository {
    valid_id: (id: string) => boolean
    create: (input: User) => Promise<User>
    find_by_id: (id: string) => Promise<User | undefined> 
    find_by_email: (email: string) => Promise<User | undefined>
    update: (input: User) => Promise<void>
    delete: (id: string) => Promise<void>
}