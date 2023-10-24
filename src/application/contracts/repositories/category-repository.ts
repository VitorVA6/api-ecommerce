import { Category } from "../../../domain/entities/category"

export default interface ICategoryRepository {
    valid_id: (id: string) => boolean
    create: (input: Category) => Promise<Category>
    find: () => Promise<Category[]>
    find_by_id: (id: string) => Promise<Category | undefined> 
    find_by_name: (name: string) => Promise<Category | undefined>
    update: (input: Category) => Promise<void>
    delete: (id: string) => Promise<void>
} 