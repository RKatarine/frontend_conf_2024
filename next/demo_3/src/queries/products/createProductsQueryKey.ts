import {ICatalogGetAllProductParams} from "@/src/queries/products/types";

export type ProductsQueryKey = [
    'infiniteCollection',
    'products',
    ICatalogGetAllProductParams
]

export const createProductsQueryKey = (params: ICatalogGetAllProductParams): ProductsQueryKey => {
    return [
        'infiniteCollection',
        'products',
        params
    ]
}