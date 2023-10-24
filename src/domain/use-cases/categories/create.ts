import { Category } from "../../entities/category"

export type input = {
    name: string,
    url_img: string
}

export default interface ICreateCategory {
    execute: (props: input) => Promise<Category>
}