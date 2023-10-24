export default interface IDeleteCategory {
    execute: (id: string) => Promise<void>
}