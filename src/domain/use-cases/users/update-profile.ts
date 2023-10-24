type update_props = {
    id: string;
    name: string;
    phone_number: string;
    cpf: string;
    password?: string;
    new_password?: string;
}

export default interface UpdateProfile {
    execute: (props: update_props) => Promise<void>
}