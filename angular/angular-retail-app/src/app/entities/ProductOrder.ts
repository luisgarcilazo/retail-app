import { Product } from "./Product";

export interface ProductOrder {
    id?: number;
    product: Product;
    amount: string;
}