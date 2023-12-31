import { User } from "../../entities/user";

export type input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

export default interface ISignupUser {
    execute: (props: input) => Promise<User>
}