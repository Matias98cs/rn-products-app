import { updateCreateProduct } from "@/core/produdcts/actions/create-update-product.actions";
import { getProductById } from "@/core/produdcts/actions/get-product-by-id.actions"
import { Product } from "@/core/produdcts/interfaces/producto.interface";
import { useMutation, useQuery } from "@tanstack/react-query"
import { Alert } from "react-native";

const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 10000 * 60 * 60, // 1 hora

    });

    const productMutation = useMutation({
        mutationFn: async (data: Product) => updateCreateProduct(data),
        onSuccess: (data: Product) => {
            Alert.alert("Producto guaradado", "El producto se guardo correctamente")
        }
    })

    return {
        productQuery,

        productMutation
    }
}

export default useProduct
