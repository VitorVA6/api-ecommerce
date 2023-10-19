import { User } from "../entities/User";

export default interface SignupUser {
    execute: (user: User) => Promise<void>
}