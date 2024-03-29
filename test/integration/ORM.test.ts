import crypto from "crypto";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountModel from "../../src/infra/orm/AccountModel";
import ORM from "../../src/infra/orm/ORM";
import Account from "../../src/domain/entity/Account";

describe("Account", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Deve testar o ORM", async function () {
        const accountId = crypto.randomUUID();
        const accountModel = new AccountModel(accountId, "EDENILSON SOUZA", "edenilson.sza@gmail.com", "79999889371", "12", "12");
        const connection = new PgPromiseAdapter();
        const orm = new ORM(connection);
        await orm.save(accountModel);
        const savedAccountModel = await orm.findBy(AccountModel, "account_id", accountId);
        expect(savedAccountModel.name).toBe("EDENILSON SOUZA");
        expect(savedAccountModel.email).toBe("edenilson.sza@gmail.com");
        expect(savedAccountModel.phone).toBe("79999889371");
        expect(savedAccountModel.cordx).toBe("12");
        expect(savedAccountModel.cordy).toBe("12");
        await connection.close();
    });

    test("Deve testar o ORM com um aggregate real", async function () {
        const accountId = crypto.randomUUID();
        const account = Account.restore(accountId, "EDENILSON SOUZA", "edenilson.sza@gmail.com", "79999889371", "12", "12");
        const accountModel = AccountModel.fromAggregate(account);
        const connection = new PgPromiseAdapter();
        const orm = new ORM(connection);
        await orm.save(accountModel);
        const savedAccountModel = await orm.findBy(AccountModel, "account_id", accountId);
        expect(savedAccountModel.name).toBe("EDENILSON SOUZA");
        expect(savedAccountModel.email).toBe("edenilson.sza@gmail.com");
        expect(savedAccountModel.phone).toBe("79999889371");

        await connection.close();
    });

    test("Deve testar o ORM com um aggregate real", async function () {
        const accountId = crypto.randomUUID();
        const email = `edenilson.sza+${Math.random()}@gmail.com`;
        const account = Account.restore(accountId, "EDENILSON SOUZA", email, "79999889371", "12", "12");
        const accountModel = AccountModel.fromAggregate(account);
        const connection = new PgPromiseAdapter();
        const orm = new ORM(connection);
        await orm.save(accountModel);
        const savedAccountModel = await orm.findBy(AccountModel, "email", email);
        expect(savedAccountModel.name).toBe("EDENILSON SOUZA");
        expect(savedAccountModel.email).toBe(email);
        expect(savedAccountModel.phone).toBe("79999889371");
        await connection.close();
    });
});
