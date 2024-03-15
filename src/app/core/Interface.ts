export interface IProduct{
    id: number | null;
    title: string | null;
    category: number | null;
    description: string | null;
    price: number | null;
    quantity: number | null;
}

export interface ICategory{
    id: number | null;
    category: string | null;
}

export interface IUser{
    id: number | null;
    email: string | null;
    password: string | null;
}