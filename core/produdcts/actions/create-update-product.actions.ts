import { prodcutsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/producto.interface";


export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id != 'new') {
        return updateProduct(product)
    }

    return createProduct(product)
}

export const updateProduct = async (product: Partial<Product>) => {

    const { id, images = [], user, ...rest } = product
    try {
        const { data } = await prodcutsApi.patch<Product>(`/products/${id}`, {
            ...rest,

        })

        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el producto")
    }

}
export const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product

    try {
        const { data } = await prodcutsApi.post<Product>(`/products`, {
            ...rest,

        });

        return data

    } catch (error) {
        console.log(error)
        throw new Error("Error al intentar crear un producto")
    }
}

