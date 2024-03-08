import { Request } from "express";
import HttpServer from "./HttpServer";
import Signup from "../../application/usecase/Signup";
import Registry, { inject } from "../di/Registry";

export default class MainController {
    @inject("signup")
    signup?: Signup;

    constructor(httpServer: HttpServer) {
        const registry = Registry.getInstance();

        httpServer.register("post", "/signup", async ({ body }: any) => {
            const output = await this.signup?.execute(body);
            return output;
        });

        httpServer.register("get", "/accounts/:page/:limit", async function ({ body, params, query }: Request) {
            const output = await registry.inject("getAllAccount").execute(params.page, params.limit, query);
            return output;
        });

        httpServer.register("get", "/accounts/:accountId", async function ({ body, params, query }: Request) {
            const output = await registry.inject("getAccount").execute(params.accountId);
            return output;
        });

        httpServer.register("put", "/accounts/:accountId", async function ({ body, params, query }: Request) {
            const output = await registry.inject("updateAccount").execute(params.accountId, body);
            return output;
        });

        httpServer.register("delete", "/accounts/:accountId", async function ({ body, params, query }: Request) {
            const output = await registry.inject("deleteAccount").execute(params.accountId);
            return output;
        });

        httpServer.register("get", "/rotas", async function ({ body, params, query }: Request) {
            const output = await registry.inject("rotas").execute();
            return output;
        });
    }
}
