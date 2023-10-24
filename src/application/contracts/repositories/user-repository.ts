import { User } from "../../../domain/entities/user";

export type update_props = {
    id: string;
    name: string;
    phone_number: string;
    cpf: string;
    password?: string;
    confirm_password?: string;
}

export default interface IUserRepository {
    valid_id: (id: string) => boolean
    create: (input: User) => Promise<User>
    find_by_id: (id: string) => Promise<User | undefined> 
    find_by_email: (email: string) => Promise<User | undefined>
    update: (props: update_props) => Promise<void>
    delete: (id: string) => Promise<void>
}