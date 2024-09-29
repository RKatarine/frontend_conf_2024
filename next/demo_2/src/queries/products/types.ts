import {apiClient} from "@/src/app/services/axios/apiClient";

type ICatalogGetAllProductFn = typeof apiClient.getAllProducts
export type ICatalogGetAllProductParams = Exclude<Parameters<ICatalogGetAllProductFn>[0],  undefined>
export type ICatalogGetAllProductResponse = ReturnType<ICatalogGetAllProductFn>