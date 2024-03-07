import DeleteUseCase from "../../application/usecase/Delete";
import GetAllUseCase from "../../application/usecase/GetAll";
import GetByIDUseCase from "../../application/usecase/GetByID";
import SignupUseCase from "../../application/usecase/Signup";
import { PgPromiseAdapter } from "../database/DatabaseConnection";
import { MailerGatewayConsole } from "../gateway/MailerGateway";
import { AccountRepositoryDatabase, AccountRepositoryORM } from "../repository/AccountRepository";
import Registry from "./Registry";

export const DependencyInjection = (registry: Registry) => {
    const connection = new PgPromiseAdapter();

    //Repositories
    const accountRepository = new AccountRepositoryDatabase(connection); //Usando SQL
    // const accountRepository = new AccountRepositoryORM(connection); //Usando ORM

    //Gateways
    const mailerGateway = new MailerGatewayConsole();

    //Use Cases
    const createAccount = new SignupUseCase(accountRepository, mailerGateway);
    const getByIDAccount = new GetByIDUseCase(accountRepository);
    const getAllAccount = new GetAllUseCase(accountRepository);
    const deleteAccount = new DeleteUseCase(accountRepository);

    registry.register("signup", createAccount);
    registry.register("getAccount", getByIDAccount);
    registry.register("getAllAccount", getAllAccount);
    registry.register("deleteAccount", deleteAccount);
};
