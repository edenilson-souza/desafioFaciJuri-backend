import { ExpressAdapter } from "./infra/http/HttpServer";
import MainController from "./infra/http/MainController";
import Registry from "./infra/di/Registry";

import { checkEnvVars } from "./infra/config/env";
import { DependencyInjection } from "./infra/di/DependencyInjection";

async function main() {
    checkEnvVars();

    //Adapters
    const httpServer = new ExpressAdapter();

    //Registering
    const registry = Registry.getInstance();
    DependencyInjection(registry);

    //Controllers
    new MainController(httpServer);

    //Server
    httpServer.listen(process.env.PORT as unknown as number);
}

main();
