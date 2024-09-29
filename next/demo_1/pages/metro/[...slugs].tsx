import {useRouter} from "next/router";
import {NextPageContext} from "next";
import commonGetServerSideProps from "@/src/pages-lib/commonGetServerSideProps";
import {getProductsQueryOptions} from "@/src/queries/products/getProductsQueryOptions";
import {ICatalogGetAllProductParams} from "@/src/queries/products/types";
import {useProductsInfiniteQuery} from "@/src/queries/products/useProductsInfiniteQuery";
import {ProductsList} from "@/src/entities/category/ProductsList";

function prettySlugs(slugs?: string | string[]) {
    if (!slugs) {
        return '';
    }
    if (typeof slugs === 'string') {
        return slugs;
    }
    return slugs.join('/');
}

function getInitialProductParams(categoryPermalink: string): ICatalogGetAllProductParams {
    return {
        storeId: `1`,
        categoryPermalink,
        page: `1`,
        take: `24`,
    }
}

export default function CategoryPage() {
    const router = useRouter();
    const {slugs} = router.query;
    const categoryPermalink = prettySlugs(slugs);

    const result = useProductsInfiniteQuery(getInitialProductParams(categoryPermalink))

    return <ProductsList categoryPermalink={categoryPermalink} {...result}/>
}

export const getServerSideProps = async (ctx: NextPageContext) => commonGetServerSideProps(
    ctx,
    async (ctx: NextPageContext, reactQueryServerService) => {
        const {slugs} = ctx.query;
        const categoryPermalink = prettySlugs(slugs);

        await reactQueryServerService.prefetchInfiniteQuery(getProductsQueryOptions(getInitialProductParams(categoryPermalink)));

        return {props: {}};
    }
)
