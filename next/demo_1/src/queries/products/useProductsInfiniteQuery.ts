import {ICatalogGetAllProductParams} from "./types";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getProductsQueryOptions} from "@/src/queries/products/getProductsQueryOptions";

export const useProductsInfiniteQuery = (productsBody: ICatalogGetAllProductParams) => {
    return useInfiniteQuery({
        ...getProductsQueryOptions(productsBody),
    })
}