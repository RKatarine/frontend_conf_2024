import {PropsWithChildren, useState} from "react";
import {DehydratedState, HydrationBoundary, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
}

interface QueryClientInitializerProps {
    readonly dehydratedState: DehydratedState;
}

export function QueryClientInitializer({dehydratedState, children}: PropsWithChildren<QueryClientInitializerProps>) {
    const [queryCache] = useState(() => new QueryCache({
        onError: (error) => {
            console.error(error);
        }
    }));

    const [queryClient] = useState(() => new QueryClient({
        ...queryClientConfig,
        queryCache,
    }));
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
}