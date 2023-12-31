export default interface IJWTHandler {
    generate: (user_id: string) => string
    validate: (token: string) => string
}