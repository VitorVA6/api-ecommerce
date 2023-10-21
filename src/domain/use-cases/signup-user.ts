import { User } from "../entities/user";

export default interface SignupUser {
    execute: (user: User) => Promise<void>
}