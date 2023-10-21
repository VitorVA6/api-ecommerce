import { User } from "../../../domain/entities/user";

export default interface UserRepository {
    create: (input: User) => Promise<void>
    find_by_id: (id: string) => Promise<User | undefined> 
    find_by_email: (email: string) => Promise<User | undefined>
    list: () => Promise<User[]>
    update: (id: string) => Promise<void>
    delete: (id: string) => Promise<void>
}