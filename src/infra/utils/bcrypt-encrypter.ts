import IEncrypter from "../../application/contracts/utils/encrypter";
import bcrypt from 'bcrypt'

export default class BcryptEncrypt implements IEncrypter{

    async encrypt(token: string): Promise<string>{
        const encrypted_token = await bcrypt.hash(token, 12)
        return encrypted_token
    }

    async check(token: string, encripted_token: string): Promise<boolean>{
        const is_valid = await bcrypt.compare(token, encripted_token)
        return is_valid
    }

}