import ICategoryRepository from "../../src/application/contracts/repositories/category-repository"
import Validator from "../../src/application/contracts/utils/validator"
import CreateCategoryService from "../../src/application/services/categories/create"
import DeleteCategoryService from "../../src/application/services/categories/delete"
import { Category } from "../../src/domain/entities/category"
import ICreateCategory from "../../src/domain/use-cases/categories/create"
import IDeleteCategory from "../../src/domain/use-cases/categories/delete"
import InMemoryCategoryRepository from "../../src/infra/repositories/in-memory/category-repository"
import ZodCategoryValidator from "../../src/infra/utils/validators/zod/category-valitador"

type validator_input = {
    name?: string;
    url_img?: string;
}

let zod_category_validator: Validator<validator_input>
let memory_category_repository: ICategoryRepository
let create_category_service: ICreateCategory
let delete_category_service: IDeleteCategory
let category: Category

describe('Delete category', () => {

    beforeEach(async () => {
        zod_category_validator = new ZodCategoryValidator()
        memory_category_repository = new InMemoryCategoryRepository()
        create_category_service = new CreateCategoryService(zod_category_validator, memory_category_repository)
        delete_category_service = new DeleteCategoryService(memory_category_repository)
        const new_category = {
            name: 'Painéis de led',
            url_img: 'painel.webp'
        }
        category = await create_category_service.execute(new_category)
    })

    it('Categoria deve ser deletada com sucesso', async () => {
        try{
            await delete_category_service.execute(category.id!)
        }catch{
            fail()
        }
    })
    it('Deve lançar erro de categoria inexistente', async () => {  
        await expect(delete_category_service.execute('4be3dc6e-3562-40b4-8eba-417715d85039'))
            .rejects.toThrow(new Error('Categoria não existe')) 
    })
})