import type {NextPageContext} from "next";
import ReactQueryServerService from "@/src/app/prefetch/ReactQueryServerService";
import requestAsyncLocalStorage, {
    IRequestAsyncLocalStorageContext
} from "@/src/app/services/requestAsyncLocalStorage/requestAsyncLocalStorage";
import {nextGetSSRPropsHistogram} from "@/src/app/metrics/custom";

function propsIsSuccess(props: any): props is { props: Record<string, any> } {
    return !(props instanceof Promise) && !('apiErrors' in props);
}

export default async function commonGetServerSideProps(ctx: NextPageContext, getServerSideProps: (ctx: NextPageContext, reactQueryServerService: ReactQueryServerService) => Promise<{
    props: Record<string, any>
}>) {
    const reactQueryServerService = new ReactQueryServerService();

    const requestAsyncLocalStorageContext: IRequestAsyncLocalStorageContext = {
        req: ctx.req,
    }

    const startTime = Date.now();

    const finalize = () => {
        const endTime = Date.now();
        const executionTimeGetSSP = endTime - startTime
        console.log(`getServerSideProps execution time: ${executionTimeGetSSP}ms`);

        const isSSP = ctx.req?.url?.startsWith('/_next/data')

        console.log(`prom client data: ${JSON.stringify({
            path: ctx.pathname,
            type: isSSP ? 'ssp' : 'ssr',
            value: executionTimeGetSSP
        }, null, 2)}}`);

        nextGetSSRPropsHistogram.labels({
            path: ctx.pathname,
            type: isSSP ? 'ssp' : 'ssr',
        }).observe(executionTimeGetSSP)
    }

    const result = await requestAsyncLocalStorage.run(
        requestAsyncLocalStorageContext,
        getServerSideProps,
        ctx,
        reactQueryServerService
    );

    if ('props' in result && propsIsSuccess(result)) {
        const {reactQueryDehydratedErrors, reactQueryDehydratedState} = reactQueryServerService.dehydrate();
        finalize();
        return {
            props: {
                ...result.props,
                reactQueryDehydratedErrors,
                reactQueryDehydratedState,
            },
        };
    }

    return result;
}