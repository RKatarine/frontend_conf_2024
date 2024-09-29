import {createProductsQueryKey} from "./createProductsQueryKey";
import {
    ICatalogGetAllProductParams,
} from "./types";
import {apiClient} from "@/src/app/services/axios/apiClient";
import {infiniteQueryOptions} from "@tanstack/react-query";

export function getProductsQueryOptions(productBody: ICatalogGetAllProductParams) {
    return infiniteQueryOptions({
        queryKey: createProductsQueryKey(productBody),
        queryFn: ({
                      queryKey: [
                          , , params
                      ]
                  }) => apiClient.getAllProducts(params),
        initialPageParam: productBody.page,
        getNextPageParam: (lastPage) => {
            const {meta} = lastPage;

            return meta ? `${meta.page + 1}` : undefined;
        },
    });
}