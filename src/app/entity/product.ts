export interface Product {
    id?: number;
    productId: string;
    name: string;
    description: string;
    imageLocation: string;
    price: number;
}

export interface SaleTransaction {
    id?: number;
    product: Product;
    amount: number;
}

export interface SaleOrder {
    id?: number;
    transactions: [SaleTransaction];
    totalPrice?: number;
}

export interface User{
    username: string;
    password: string;
    role: string;
}
