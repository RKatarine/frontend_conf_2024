import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClientInitializer} from "@/src/app/QueryClientInitializer";

export default function App({Component, pageProps}: AppProps) {
    const {reactQueryDehydratedState} = pageProps;
    return (
        <QueryClientInitializer dehydratedState={reactQueryDehydratedState}>
            <Component {...pageProps} />
        </QueryClientInitializer>
    );
}
