type input = {
    email: string,
    password: string
}

export default interface LoginUser {
    execute: (props: input) => Promise<string>
}