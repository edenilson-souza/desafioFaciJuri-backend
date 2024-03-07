import GetAccount from "../../application/usecase/GetAccount";
import GetAllAccount from "../../application/usecase/GetAllAccount";
import Signup from "../../application/usecase/Signup";
import { PgPromiseAdapter } from "../database/DatabaseConnection";
import { MailerGatewayConsole } from "../gateway/MailerGateway";
import { AccountRepositoryDatabase } from "../repository/AccountRepository";
import Registry from "./Registry";

export const DependencyInjection = (registry: Registry) => {
    const connection = new PgPromiseAdapter();

    //Repositories
    const accountRepository = new AccountRepositoryDatabase(connection);

    //Gateways
    const mailerGateway = new MailerGatewayConsole();

    //Use Cases
    const signup = new Signup(accountRepository, mailerGateway);
    const getAccount = new GetAccount(accountRepository);
    const getAllAccount = new GetAllAccount(accountRepository);

    registry.register("signup", signup);
    registry.register("getAccount", getAccount);
    registry.register("getAllAccount", getAllAccount);
};
