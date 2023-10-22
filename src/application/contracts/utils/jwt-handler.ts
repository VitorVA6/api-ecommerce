export default interface JWTHandler {
    generate: (user_id: string) => string
}