export default interface IDeleteAccount {
    execute: (id: string) => Promise<void>
}