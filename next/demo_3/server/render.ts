import tryTrackRenderMetrics from "./tryTrackRenderMetrics";
import {IDeprivatizedNextAppServer, IFastifyReply, IFastifyRequest} from "./types";

export default async function render(
    app: IDeprivatizedNextAppServer,
    req: IFastifyRequest,
    reply: IFastifyReply,
    path: string,
): Promise<void> {

    await app.getRequestHandler()(req.raw, reply.raw)

    tryTrackRenderMetrics(req.raw, reply.raw)
}