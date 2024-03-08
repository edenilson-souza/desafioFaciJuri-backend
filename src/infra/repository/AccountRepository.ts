//istanbul ignore file
import Account from "../../domain/entity/Account";
import DatabaseConnection from "../database/DatabaseConnection";
import ORM from "../orm/ORM";
import AccountModel from "../orm/AccountModel";

// Port
export default interface AccountRepository {
    save(account: Account): Promise<void>;
    getAll(page: number, limit: number, filters?: any): Promise<Account[]>;
    getById(accountId: string): Promise<Account | undefined>;
    getByEmail(email: string): Promise<Account | undefined>;
    getByField(field: string, value: string): Promise<Account | undefined>;
    update(account: Account): Promise<void>;
    delete(account: Account): Promise<void>;
}

// Adapter SQL
export class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async save(account: Account) {
        await this.connection.query("INSERT INTO desfacijuri.account (account_id, name, email, phone, cordx, cordy) values ($1, $2, $3, $4, $5, $6)", [
            account.accountId,
            account.getName(),
            account.getEmail(),
            account.getPhone(),
            account.getCordX(),
            account.getCordY()
        ]);
    }

    async getAll(page: number, limit: number, filters: any) {
        let query = "SELECT * FROM desfacijuri.account";
        let values = [];

        if (Object.keys(filters).length > 0) {
            query += " WHERE ";
            let i = 0;
            for (const key in filters) {
                if (i > 0) query += " AND ";
                query += `${key} ILIKE $${i + 1}`;
                values.push(`%${filters[key]}%`);
                i++;
            }
        }

        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, (page - 1) * limit);

        const accounts = await this.connection.query(query, values);
        return accounts.map((account: any) => Account.restore(account.account_id, account.name, account.email, account.phone, account.cordx, account.cordy));
    }

    async getById(accountId: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE account_id = $1", [accountId]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone, account.cordx, account.cordy);
    }

    async getByEmail(email: string) {
        const [account] = await this.connection.query("SELECT * FROM desfacijuri.account WHERE email = $1", [email]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone, account.cordx, account.cordy);
    }

    async getByField(field: string, value: string) {
        const [account] = await this.connection.query(`SELECT * FROM desfacijuri.account WHERE ${field} = $1`, [value]);
        if (!account) return;
        return Account.restore(account.account_id, account.name, account.email, account.phone, account.cordx, account.cordy);
    }

    async update(account: Account) {
        await this.connection.query("UPDATE desfacijuri.account SET name = $1, email = $2, phone = $3, cordx = $4, cordy = $5 WHERE account_id = $6", [
            account.getName(),
            account.getEmail(),
            account.getPhone(),
            account.getCordX(),
            account.getCordY(),
            account.accountId
        ]);
    }

    async delete(account: Account) {
        await this.connection.query("DELETE FROM desfacijuri.account WHERE account_id = $1", [account.accountId]);
    }
}

// Adapter ORM
export class AccountRepositoryORM implements AccountRepository {
    orm: ORM;

    constructor(readonly connection: DatabaseConnection) {
        this.orm = new ORM(connection);
    }

    async save(account: Account) {
        const accountModel = new AccountModel(
            account.accountId,
            account.getName(),
            account.getEmail(),
            account.getPhone(),
            account.getCordX(),
            account.getCordY()
        );
        await this.orm.save(accountModel);
    }

    async getAll(page: number, limit: number): Promise<Account[]> {
        const accounts = await this.orm.findAll(AccountModel, page, limit);
        return accounts.map((account: any) => account.getAggregate());
    }

    async getById(accountId: string) {
        const account = await this.orm.findBy(AccountModel, "account_id", accountId);
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

    async update(account: Account): Promise<void> {
        const accountModel = new AccountModel(
            account.accountId,
            account.getName(),
            account.getEmail(),
            account.getPhone(),
            account.getCordX(),
            account.getCordY()
        );

        await this.orm.update(AccountModel, "account_id", account.accountId, accountModel);
    }

    async delete(account: Account): Promise<void> {
        await this.orm.delete(AccountModel, "account_id", account.accountId);
    }
}
