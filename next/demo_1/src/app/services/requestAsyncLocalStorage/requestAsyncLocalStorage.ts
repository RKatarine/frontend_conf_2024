import {NextPageContext} from "next";

export interface IRequestAsyncLocalStorageContext {
    req: NextPageContext["req"];
}

const requestAsyncLocalStorage = new AsyncLocalStorage<IRequestAsyncLocalStorageContext>()
export default requestAsyncLocalStorage