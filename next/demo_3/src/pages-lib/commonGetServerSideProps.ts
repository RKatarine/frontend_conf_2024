import type {NextPageContext} from "next";
import ReactQueryServerService from "@/src/app/prefetch/ReactQueryServerService";
import requestAsyncLocalStorage, {IRequestAsyncLocalStorageContext} from "@/server/requestAsyncLocalStorage";
import type {IFastifyRequest} from "@/server/types";

function propsIsSuccess(props: any): props is { props: Record<string, any> } {
    return !(props instanceof Promise) && !('apiErrors' in props);
}

export default async function commonGetServerSideProps(ctx: NextPageContext, getServerSideProps: (ctx: NextPageContext, reactQueryServerService: ReactQueryServerService) => Promise<{ props: Record<string, any> }>) {
    const reactQueryServerService = new ReactQueryServerService();

    const requestAsyncLocalStorageContext: IRequestAsyncLocalStorageContext = {
        req: ctx.req as unknown as IFastifyRequest['raw'],
    }

    const startTime = Date.now();

    const finalize = () => {
        const endTime = Date.now();
        // @ts-expect-error apiTime is not defined in res
        ctx.res.apiTime = endTime - startTime;
        console.log(`getServerSideProps execution time: ${endTime - startTime}ms`);
    }

    const result = await requestAsyncLocalStorage.run(
        requestAsyncLocalStorageContext,
        getServerSideProps,
        ctx,
        reactQueryServerService
    );

    if ('props' in result && propsIsSuccess(result)) {
        const { reactQueryDehydratedErrors, reactQueryDehydratedState } = reactQueryServerService.dehydrate();
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