export interface IProduct{
    id_product: number | null;
    title: string | null;
    id_category: number | null;
    description: string | null;
    price: number | null;
    quantity?: number | null;
}

export interface ICategory{
    id_category: number | null;
    category: string | null;
}

export interface IUser{
    id: number | null;
    email: string | null;
    password: string | null;
}