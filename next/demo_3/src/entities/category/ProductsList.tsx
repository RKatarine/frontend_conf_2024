import {Fragment} from "react";
import type {useProductsInfiniteQuery} from "@/src/queries/products/useProductsInfiniteQuery";
import {ProductCard} from "@/src/entities/product/card/ProductCard";
import styles from "./ProductsList.module.css";


type ProductsListProps = {
    categoryPermalink: string;
} & ReturnType<typeof useProductsInfiniteQuery>
export const ProductsList = ({
                                 categoryPermalink,
                                 data,
                                 fetchNextPage,
                                 hasNextPage,
                                 isFetchingNextPage,
                             }: ProductsListProps) => {
    return <>
        <div>Category: {categoryPermalink}</div>
        <main className={styles.root}>
            <ul className={styles.list}>
                {data?.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.data.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </Fragment>
                ))}
            </ul>
            <button className={styles.loadMore} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
            </button>
        </main>
    </>
}