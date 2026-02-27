import { Product } from "../types/IProducts";
import { API_BASE_URL } from "../config";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error(`Problemas al traer los productios: ${response.statusText}`);
    }
    return (await response.json()) as Product[];
}