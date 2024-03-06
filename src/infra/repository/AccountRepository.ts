//istanbul ignore file
import Account from "../../domain/entity/Account";
import DatabaseConnection from "../database/DatabaseConnection";
import ORM from "../orm/ORM";
import AccountModel from "../orm/AccountModel";

// Port
export default interface AccountRepository {
    save(account: Account): Promise<void>;
    getByEmail(email: string): Promise<Account | undefined>;
    getById(accountId: string): Promise<Account | undefined>;
}

// Adapter Database
export class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async save(account: Account) {
        //USANDO ORM PARA SALVAR
        /* const orm = new ORM(this.connection);
        const accountModel = new AccountModel(account.accountId, account.getName(), account.getEmail(), account.getPhone());
        await orm.save(accountModel); */

        // USANDO QUERY PARA SALVAR
        await this.connection.query("INSERT INTO desfacijuri.account (account_id, name, email, phone) values ($1, $2, $3, $4)", [
            account.accountId,
            account.getName(),
            account.getEmail(),
            account.getPhone()
        ]);
    }

    async getByEmail(email: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE email = $1", [email]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone);
    }

    async getById(accountId: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE account_id = $1", [accountId]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone);
    }
}

export class AccountRepositoryORM implements AccountRepository {
    orm: ORM;

    constructor(readonly connection: DatabaseConnection) {
        this.orm = new ORM(connection);
    }

    async save(account: Account) {
        await this.orm.save(AccountModel.fromAggregate(account));
    }

    async getByEmail(email: string) {
        const account = await this.orm.findBy(AccountModel, "email", email);
        if (!account) return;
        const aggregate = account.getAggregate();
        return aggregate;
    }

    async getById(accountId: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE account_id = $1", [accountId]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone);
    }
}
