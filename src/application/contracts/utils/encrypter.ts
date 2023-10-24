export default interface IEncrypter {
    encrypt: (token: string) => Promise<string>
    check: (token: string, encripted_token: string) => Promise<boolean>
}