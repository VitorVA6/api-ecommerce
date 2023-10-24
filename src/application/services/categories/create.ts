import { Category } from "../../../domain/entities/category";
import ICreateCategory, { input } from "../../../domain/use-cases/categories/create";
import ICategoryRepository from "../../contracts/repositories/category-repository";
import IValidator from "../../contracts/utils/validator";

type validate_props = {
    name?: string,
    url_img?: string
} 

export default class CreateCategoryService implements ICreateCategory{
    constructor(
        private readonly category_validator: IValidator<validate_props>,
        private readonly category_repository: ICategoryRepository
    ){}

    async execute({name, url_img}: input): Promise<Category>{
        if(!name || !url_img) throw new Error("Preencha todos os campos")

        this.category_validator.validate({name, url_img})

        const name_exists = await this.category_repository.find_by_name(name)

        if(name_exists) throw new Error('Nome de categoria já está em uso.')

        const category = await this.category_repository.create({
            name,
            url_img
        })
        return category
    }
}