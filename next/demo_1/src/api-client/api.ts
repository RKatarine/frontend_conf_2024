/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {HttpClient, RequestParams} from "./http-client";
import {CategoryPageDto, Order} from "./data-contracts";

export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Category
     * @name GetAllProducts
     * @request GET:/api/category
     * @response `200` `CategoryPageDto` List of products in category
     */
    getAllProducts = (
        query: {
            order?: Order;
            page?: string;
            take?: string;
            storeId: string;
            categoryPermalink: string;
        },
        params: RequestParams = {},
    ) =>
        this.request<CategoryPageDto, any>({
            path: `/api/category`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params,
        });
}
