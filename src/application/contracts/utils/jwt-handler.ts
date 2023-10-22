export default interface JWTHandler {
    token_generator: (user_id: string) => Promise<string>
}