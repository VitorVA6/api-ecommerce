import IDeleteCategory from "../../../domain/use-cases/categories/delete";
import ICategoryRepository from "../../contracts/repositories/category-repository";

export default class DeleteCategoryService implements IDeleteCategory {
    constructor(
        private readonly category_repository: ICategoryRepository
    ){}

    async execute(id: string): Promise<void>{
        if(!id) throw new Error('Identificador da categoria é obrigatório')

        if(!this.category_repository.valid_id(id)) throw new Error('ID inválido')

        const category = await this.category_repository.find_by_id(id)

        if(!category) throw new Error('Categoria não existe')

        await this.category_repository.delete(id)
    }
}