export type update_props = {
    id: string;
    name: string;
    url_img: string;
}

export default interface IUpdateCategory {
    execute: (props: update_props) => Promise<void>
}