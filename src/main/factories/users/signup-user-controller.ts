import SignupUserService from "../../../application/services/users/signup"
import InMemoryUserRepository from "../../../infra/repositories/in-memory/user-repository"
import BcryptEncrypt from "../../../infra/utils/bcrypt-encrypter"
import ZodUserValidator from "../../../infra/utils/validators/zod/user-validator"
import SignupUserController from "../../../presentation/controllers/users/signup"

export default function signup_user_controller_maker() {
    const inmemory_user_repository = new InMemoryUserRepository()
    const zod_user_validator = new ZodUserValidator()
    const bcrypt_encrypter = new BcryptEncrypt()

    const signup_user_service = new SignupUserService(
        zod_user_validator,
        inmemory_user_repository,
        bcrypt_encrypter
    )

    return new SignupUserController(signup_user_service)
}