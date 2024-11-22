import { updateCreateProduct } from "@/core/produdcts/actions/create-update-product.actions";
import { getProductById } from "@/core/produdcts/actions/get-product-by-id.actions"
import { Product } from "@/core/produdcts/interfaces/producto.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react";
import { Alert } from "react-native";

const useProduct = (productId: string) => {

    const queryClient = useQueryClient()
    const productIfRef = useRef(productId)

    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 10000 * 60 * 60, // 1 hora

    });

    const productMutation = useMutation({
        mutationFn: async (data: Product) => updateCreateProduct({
            ...data,
            id: productIfRef.current
        }),
        onSuccess: (data: Product) => {

            productIfRef.current = data.id;
            
            queryClient.invalidateQueries({
                queryKey: ["products", "infinite"]
            });

            queryClient.invalidateQueries({
                queryKey: ["product", data.id]
            });
            Alert.alert("Producto guaradado", "El producto se guardo correctamente")
        }
    })

    return {
        productQuery,

        productMutation
    }
}

export default useProduct
