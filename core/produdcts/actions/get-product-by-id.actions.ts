import { API_URL, prodcutsApi } from "@/core/api/productsApi"
import { type Product } from "../interfaces/producto.interface"

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const { data } = await prodcutsApi.get<Product>(`/products/${id}`)
        return {
            ...data,
            images: data.images.map(image => `${API_URL}/files/product/${image}`),
        }
    } catch (error) {
        console.log(error)
        throw new Error('Product with id not found')
    }
}