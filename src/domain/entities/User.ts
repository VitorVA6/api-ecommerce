export type User = {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
    role: 'user' | 'admin';
    password_reset_token: ResetToken | undefined;
    email_reset_token: ResetToken | undefined;
}

type ResetToken = {
    expires: Date;
    token: String;
}