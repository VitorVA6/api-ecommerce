export type User = {
    id?: string,
    name: string,
    email: string,
    password: string,
    role: string
    password_reset_token: ResetToken | undefined,
    email_reset_token: ResetToken | undefined,
}

type ResetToken = {
    expires: Date,
    token: String
}