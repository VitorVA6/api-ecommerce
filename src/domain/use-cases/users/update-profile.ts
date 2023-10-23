type update_props = {
    id: string;
    name: string;
    phone_number: string;
    cpf: string;
    password?: string;
    confirm_password?: string;
}

export default interface UpdateProfile {
    execute: (props: update_props) => Promise<void>
}