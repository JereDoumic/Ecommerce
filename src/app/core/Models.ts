import { ICategory, IUser } from "./Interface";

export class Product implements Product{
    id: number | null;
    title: string | null;
    category: number | null;
    description: string | null;
    price: number | null;
    image: string | null;
    quantity: number | null;

    constructor(id: number, title: string, category: number, description: string, price: number, image: string,
                quantity: number){
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.image = image;
        this.quantity = quantity
    }
}

export class Category implements ICategory{
    id: number | null;
    category: string | null;

    constructor(id: number, category: string){
        this.id = id;
        this.category = category;
    }
}

export class User implements IUser{
    id: number | null;
    email: string | null;
    password: string | null;
    
    constructor(id: number, email: string, password: string){
        this.id = id;
        this.email = email;
        this.password = password;
    }
}