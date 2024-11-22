import { API_URL, prodcutsApi } from "@/core/api/productsApi"
import { Gender, type Product } from "../interfaces/producto.interface"

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    tags: [],
}

export const getProductById = async (id: string): Promise<Product> => {

    if (id === 'new') return emptyProduct

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