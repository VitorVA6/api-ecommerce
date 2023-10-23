type input = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    cpf: string;
}

export default interface SignupUser {
    execute: (props: input) => Promise<void>
}