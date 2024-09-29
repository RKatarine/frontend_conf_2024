import {createProxyMiddleware} from 'http-proxy-middleware';
export const config = {
    api: {
        bodyParser: false,
    },
};

interface ProxyOptions {
    target: string;
    originalUrl: string;
    service: string;
    pathRewrite?: (path: string) => string;
    pathFilter?: string | string[];
}

const createProxy = ({
                         target,
                         pathRewrite = (path) => path.replace(/^\/server/, ''),
                         originalUrl,
                         service,
                     }: ProxyOptions) => {
    console.log(`Proxying ${service} to ${target} (originalUrl: ${originalUrl})`);
    return createProxyMiddleware({
        target,
        autoRewrite: false,
        pathRewrite,
        changeOrigin: true,
    });
};



const apiProxy = createProxy({
    target: process.env.NEXT_PUBLIC_API_URL!,
    originalUrl: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/server`,
    pathRewrite: (path) => path.replace(/^\/api\/server/, ''),
    service: 'page_router_client',
});

export default apiProxy;