import { ICategory, IUser } from "./Interface";

export class Product implements Product{
    id_product: number | null;
    title: string | null;
    id_category: number | null;
    description: string | null;
    price: number | null;
    image: string | null;
    quantity?: number | null;

    constructor(id: number, title: string, category: number, description: string, price: number, image: string,
                quantity?: number){
        this.id_product = id;
        this.title = title;
        this.id_category = category;
        this.description = description;
        this.price = price;
        this.image = image;
        this.quantity = quantity ?? 1
    }
}

export class Category implements ICategory{
    id_category: number | null;
    category: string | null;

    constructor(id: number, category: string){
        this.id_category = id;
        this.category = category;
    }
}

export class User implements IUser{
    id_user: number | null;
    email: string | null;
    password: string | null;
    userName: string | null;
    
    constructor(id: number, email: string, password: string, userName: string){
        this.id_user = id;
        this.email = email;
        this.password = password;
        this.userName = userName;
    }
}