import ICategoryRepository from "../../src/application/contracts/repositories/category-repository"
import Validator from "../../src/application/contracts/utils/validator"
import CreateCategoryService from "../../src/application/services/categories/create"
import UpdateCategoryService from "../../src/application/services/categories/update"
import { Category } from "../../src/domain/entities/category"
import ICreateCategory from "../../src/domain/use-cases/categories/create"
import IUpdateCategory from "../../src/domain/use-cases/categories/update"
import InMemoryCategoryRepository from "../../src/infra/repositories/in-memory/category-repository"
import ZodCategoryValidator from "../../src/infra/utils/validators/zod/category-valitador"

type validator_input = {
    name?: string;
    url_img?: string;
}

let zod_category_validator: Validator<validator_input>
let memory_category_repository: ICategoryRepository
let create_category_service: ICreateCategory
let update_category_service: IUpdateCategory
let category: Category

describe('Delete category', () => {

    beforeEach(async () => {
        zod_category_validator = new ZodCategoryValidator()
        memory_category_repository = new InMemoryCategoryRepository()
        create_category_service = new CreateCategoryService(zod_category_validator, memory_category_repository)
        update_category_service = new UpdateCategoryService(zod_category_validator, memory_category_repository)
        const new_category = {
            name: 'Painéis de led',
            url_img: 'painel.webp'
        }
        category = await create_category_service.execute(new_category)
    })

    it('Categoria deve ser atualizada com sucesso', async () => {
        try{
            const category_update = {
                id: category.id!,
                name: 'Vasos',
                url_img: 'vaso.jpg'
            }
            await update_category_service.execute(category_update)
        }catch{
            fail()
        }
    })
    it('Deve lançar erro de categoria não existe', async () => {
        const category_update = {
            id: '4be3dc6e-3562-40b4-8eba-417715d85039',
            name: 'Vasos',
            url_img: 'vaso.jpg'
        }
        await expect(update_category_service.execute(category_update))
        .rejects.toThrow(new Error('Categoria não existe.'))
    })
    it('Deve lançar erro de nome já está em uso', async () => {
        const new_category = {
            name: 'Shopee',
            url_img: 'painel.webp'
        }
        await create_category_service.execute(new_category)

        const category_update = {
            id: category.id!,
            name: 'Shopee',
            url_img: 'vaso.jpg'
        }
        await expect(update_category_service.execute(category_update))
        .rejects.toThrow(new Error('Esse nome de categoria já existe.'))
    })
})