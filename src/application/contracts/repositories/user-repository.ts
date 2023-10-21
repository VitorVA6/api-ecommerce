import { User } from "../../../domain/entities/user";

type update_props = {
    id: string,
    name: string,
    email: string,
    password: string
}

export default interface UserRepository {
    create: (input: User) => Promise<void>
    find_by_id: (id: string) => Promise<User | undefined> 
    find_by_email: (email: string) => Promise<User | undefined>
    update: (props: update_props) => Promise<void>
    delete: (id: string) => Promise<void>
}