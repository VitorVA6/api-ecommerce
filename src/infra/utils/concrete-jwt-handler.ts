import JWTHandler from "../../application/contracts/utils/jwt-handler";
import jwt from 'jsonwebtoken'

export default class ConcreteJWTHandler implements JWTHandler {
    
    private secret = 'aoaaoadlkfaoiaf'
    
    generate(key: string): string{
        const token = jwt.sign({key}, this.secret, {expiresIn: '1d'})
        return token
    }

    validate(token: string): string{
        const payload = jwt.verify(token, this.secret) as jwt.JwtPayload
        return payload.key
    }
}