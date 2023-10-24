export type input = {
    email: string,
    password: string
}

export default interface ILoginUser {
    execute: (props: input) => Promise<string>
}