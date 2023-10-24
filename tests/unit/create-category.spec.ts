import ICategoryRepository from "../../src/application/contracts/repositories/category-repository"
import Validator from "../../src/application/contracts/utils/validator"
import CreateCategoryService from "../../src/application/services/categories/create"
import ICreateCategory from "../../src/domain/use-cases/categories/create"
import InMemoryCategoryRepository from "../../src/infra/repositories/in-memory/category-repository"
import ZodCategoryValidator from "../../src/infra/utils/validators/zod/category-valitador"

type validator_input = {
    name?: string;
    url_img?: string;
}

let zod_category_validator: Validator<validator_input>
let memory_category_repository: ICategoryRepository
let create_category_service: ICreateCategory

describe('Signup user', () => {

    beforeEach(() => {
        zod_category_validator = new ZodCategoryValidator()
        memory_category_repository = new InMemoryCategoryRepository()
        create_category_service = new CreateCategoryService(zod_category_validator, memory_category_repository)
    })

    it('Categoria deve ser cadastrada com sucesso', async () => {
        const new_category = {
            name: 'Painéis de led',
            url_img: 'painel.webp'
        }
        const category = await create_category_service.execute(new_category)

        expect(category.name).toBe('Painéis de led')
        expect(category.url_img).toBe('painel.webp')
    })
    it('Deve ser lançado um erro de categoria já existente', async () => {
        const new_category = {
            name: 'Painéis de led',
            url_img: 'painel.png'
        }
        await create_category_service.execute(new_category)

        await expect(create_category_service.execute(new_category)).rejects.toThrow(new Error('Nome de categoria já está em uso.'))
    })
    it('Deve ser lançado um erro de formato de arquivo inválido', async () => {
        const new_category = {
            name: 'Painéis de led',
            url_img: 'painel.txt'
        }
        await expect(create_category_service.execute(new_category)).rejects.toThrow(new Error('Formato de arquivo inválido.'))
    })
})