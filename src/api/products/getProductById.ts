import { API_BASE_URL } from "../config";
import { Product } from "../types/IProducts";

export async function getProductById(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Problemas al traer el producto: ${response.statusText}`);
    }
    return (await response.json()) as Product;
}