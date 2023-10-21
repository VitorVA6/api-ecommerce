type input = {
    name: string,
    email: string,
    password: string
}

export default interface SignupUser {
    execute: (props: input) => Promise<void>
}