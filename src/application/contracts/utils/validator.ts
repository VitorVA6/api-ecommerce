export default interface Validator<T> {
    validate: (entity: T) => void
}