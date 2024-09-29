import {registerOTel} from "@vercel/otel";

export async function register() {
    console.log('Configuring instrumentation');

    registerOTel({ serviceName: process.env.NEXT_PUBLIC_APP_PREFIX })

    if (process.env.NEXT_RUNTIME === 'nodejs') {

        const promClient = await import('prom-client');

        console.log('Configuring default prom metrics');
        promClient.collectDefaultMetrics({
            prefix: `${process.env.NEXT_PUBLIC_APP_PREFIX}_`,
        })
    }
}