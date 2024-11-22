import { getProducts } from "@/core/produdcts/actions/get-products.actions"
import { useInfiniteQuery } from "@tanstack/react-query"

const useProducts = () => {

    const productsQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),
        staleTime: 10000 * 60 * 60, // 1 hora
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => allPages.length
    });



    return {
        productsQuery,

        //Methos

        loadNextPage: productsQuery.fetchNextPage
    }
}

export default useProducts
