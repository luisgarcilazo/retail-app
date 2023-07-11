import { ProductOrder } from "./ProductOrder";

export interface Order {
    id?: number;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    zipcode: number;
    status: string;
    totalcost: number;
    filename: string;
    filepath: string;
    productOrders: ProductOrder[];
}