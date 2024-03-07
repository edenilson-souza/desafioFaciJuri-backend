//istanbul ignore file
import Account from "../../domain/entity/Account";
import DatabaseConnection from "../database/DatabaseConnection";
import ORM from "../orm/ORM";
import AccountModel from "../orm/AccountModel";

// Port
export default interface AccountRepository {
    save(account: Account): Promise<void>;
    getAll(page: number, limit: number): Promise<Account[]>;
    getById(accountId: string): Promise<Account | undefined>;
    getByEmail(email: string): Promise<Account | undefined>;
    getByField(field: string, value: string): Promise<Account | undefined>;
}

// Adapter Database
export class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async save(account: Account) {
        await this.connection.query("INSERT INTO desfacijuri.account (account_id, name, email, phone) values ($1, $2, $3, $4)", [
            account.accountId,
            account.getName(),
            account.getEmail(),
            account.getPhone()
        ]);
    }

    async getAll(page: number, limit: number) {
        const accounts = await this.connection.query("SELECT * FROM desfacijuri.account LIMIT $1 OFFSET $2", [limit, (page - 1) * limit]);
        return accounts.map((account: any) => Account.restore(account.account_id, account.name, account.email, account.phone));
    }

    async getById(accountId: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE account_id = $1", [accountId]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone);
    }
    async getByEmail(email: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE email = $1", [email]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone);
    }

    async getByField(field: string, value: string) {
        const [account] = await this.connection.query(`SELECT * FROM desfacijuri.account WHERE ${field} = $1`, [value]);
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

    async getAll(page: number, limit: number): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }

    async getById(accountId: string) {
        const account = await this.orm.findBy(AccountModel, "accountId", accountId);
        if (!account) return;
        const aggregate = account.getAggregate();
        return aggregate;
    }

    async getByEmail(email: string) {
        const account = await this.orm.findBy(AccountModel, "email", email);
        if (!account) return;
        const aggregate = account.getAggregate();
        return aggregate;
    }

    async getByField(field: string, value: string) {
        const account = await this.orm.findBy(AccountModel, field, value);
        if (!account) return;
        const aggregate = account.getAggregate();
        return aggregate;
    }
}
