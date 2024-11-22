import { API_URL, prodcutsApi } from "@/core/api/productsApi"
import { type Product } from "../interfaces/producto.interface"

export const getProducts = async (limit = 20, offset = 0) => {
    try {
        const { data } = await prodcutsApi.get<Product[]>(`/products?limit=${limit}&offset=${offset}`)

        return data.map(product => ({
            ...product,
            images: product.images.map(image => `${API_URL}/files/product/${image}`),
        }))
    } catch (error) {
        console.log(error)
        throw new Error('Unable to load products')
    }
}