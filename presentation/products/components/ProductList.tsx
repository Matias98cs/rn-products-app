import { Product } from "@/core/produdcts/interfaces/producto.interface";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshControl } from "react-native";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  const queryClient = useQueryClient();

  const [isRefresing, setIsRefresing] = useState(false);

  const onPullToRefresh = async () => {
    console.log('llamando')
    setIsRefresing(true);
    await new Promise((resolve, reject) => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });

    setIsRefresing(false);
  };
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefresing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;
