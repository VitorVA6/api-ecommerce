export default interface IValidator<T> {
    validate: (entity: T) => void
}