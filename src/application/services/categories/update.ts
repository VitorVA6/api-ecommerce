import IUpdateCategory, { update_props } from "../../../domain/use-cases/categories/update";
import ICategoryRepository from "../../contracts/repositories/category-repository";
import IValidator from "../../contracts/utils/validator";

type validate_props = {
    name?: string,
    url_img?: string
} 

export default class UpdateCategoryService implements IUpdateCategory{
    constructor(
        private readonly category_validator: IValidator<validate_props>,
        private readonly category_repository: ICategoryRepository
    ){}

    async execute({id, name, url_img}: update_props): Promise<void>{
        if(!id) throw new Error('Identificador da categoria é obrigatório.')

        if(!name || !url_img) throw new Error("Preencha todos os campos.")

        if(!this.category_repository.valid_id(id)) throw new Error('ID inválido.')

        this.category_validator.validate({name, url_img})

        const category = await this.category_repository.find_by_id(id)
        if(!category) throw new Error('Categoria não existe.')

        const name_exists = await this.category_repository.find_by_name(name)

        if(name_exists && name_exists.id !== id) throw new Error('Esse nome de categoria já existe.')

        category.name = name
        category.url_img = url_img

        await this.category_repository.update(category)
    }
}