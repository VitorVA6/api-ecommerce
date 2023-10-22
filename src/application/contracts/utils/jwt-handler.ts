export default interface JWTHandler {
    generate: (user_id: string) => string
    validate: (token: string) => string
}