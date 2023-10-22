export default interface DeleteAccount {
    execute: (id: string) => Promise<void>
}