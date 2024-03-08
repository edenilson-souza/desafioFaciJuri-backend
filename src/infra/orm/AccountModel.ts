//istanbul ignore file
import Account from "../../domain/entity/Account";
import { Model, column, model } from "./ORM";

@model("desfacijuri", "account")
export default class AccountModel extends Model {
    @column("account_id", true)
    accountId: string;
    @column("name")
    name: string;
    @column("email")
    email: string;
    @column("phone")
    phone: string;
    @column("cordx")
    cordx: string;
    @column("cordy")
    cordy: string;

    constructor(accountId: string, name: string, email: string, phone: string, cordx: string, cordy: string) {
        super();
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.cordx = cordx;
        this.cordy = cordy;
    }

    static fromAggregate(account: Account) {
        return new AccountModel(account.accountId, account.getName(), account.getEmail(), account.getPhone(), account.getCordX(), account.getCordY());
    }

    getAggregate() {
        return Account.restore(this.accountId, this.name, this.email, this.phone, this.cordx, this.cordy);
    }
}
