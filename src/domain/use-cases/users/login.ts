type input = {
    email: string,
    password: string
}

type output = {
    token: string,
    user_name: string
}

export default interface LoginUser {
    execute: (props: input) => Promise<output>
}