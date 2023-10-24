import ICategoryRepository, {} from "../../../application/contracts/repositories/category-repository";
import { CategoryModel } from "../../../application/models/Category";
import { v4 as uuid, validate } from 'uuid';

export default class InMemoryCategoryRepository implements ICategoryRepository {
    
    private categories: CategoryModel[] = []
    
    valid_id(id: string): boolean {
        return validate(id)
    }

    async find(): Promise<CategoryModel[]>{
        const categories = await this.categories.map(el => el)
        return categories
    }

    async create(input: CategoryModel): Promise<CategoryModel> {
        const new_user = {
            id: uuid(),
            ...input
        }
        await this.categories.push(new_user)
        return new_user
    }

    async find_by_id(id: string): Promise<CategoryModel | undefined> {
        const user = await this.categories.find(el => el.id === id)
        return user
    }

    async find_by_name(name: string): Promise<CategoryModel | undefined> {
        const user = await this.categories.find(el => el.name === name)
        return user
    }

    async update({id, name, url_img}: CategoryModel): Promise<void> {
        this.categories = await this.categories.map(el => {
            if(el.id === id){
                return ({
                    ...el,
                    name,
                    url_img
                })
            }
            return el
        })
    }

    async delete(id: string): Promise<void> {
        this.categories = await this.categories.filter(el => el.id !== id)
    }
}