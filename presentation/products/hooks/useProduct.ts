import { getProductById } from "@/core/produdcts/actions/get-product-by-id.actions"
import { useQuery } from "@tanstack/react-query"

const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 10000 * 60 * 60, // 1 hora

    })

    return {
        productQuery
    }
}

export default useProduct
