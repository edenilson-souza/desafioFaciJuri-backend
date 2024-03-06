import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import { MailerGatewayConsole } from "./infra/gateway/MailerGateway";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import MainController from "./infra/http/MainController";
import Registry from "./infra/di/Registry";

import { checkEnvVars } from "./infra/config/env";

async function main() {
    checkEnvVars();

    //Adapters
    const httpServer = new ExpressAdapter();
    const connection = new PgPromiseAdapter();

    //Repositories
    const accountRepository = new AccountRepositoryDatabase(connection);

    //Gateways
    const mailerGateway = new MailerGatewayConsole();

    //Use Cases
    const signup = new Signup(accountRepository, mailerGateway);
    const getAccount = new GetAccount(accountRepository);

    //Registering
    const registry = Registry.getInstance();
    registry.register("signup", signup);
    registry.register("getAccount", getAccount);

    //Controllers
    new MainController(httpServer);

    //Server
    httpServer.listen(process.env.PORT as unknown as number);
}

main();
