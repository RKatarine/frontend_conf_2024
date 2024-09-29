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

export interface CatalogApiV3Product {
  id: number;
  sku: string;
  retailerSku: string;
  available: boolean;
  legacyOfferId: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  humanVolume: string;
  volume: number;
  volumeType: string;
  itemsPerPack: number;
  discountEndsAt: string;
  priceType: string;
  gramsPerUnit: number;
  unitPrice: number;
  originalUnitPrice: number;
  score: number;
  imageUrl: string;
  slug: string;
  maxSelectQuantity: number;
  canonicalUrl: string;
  maxPerOrder: number;
}

export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CategoryPageDto {
  data: CatalogApiV3Product[];
  meta: PageMetaDto;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}