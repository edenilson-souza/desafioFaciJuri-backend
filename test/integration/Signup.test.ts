import { AccountRepositoryDatabase, AccountRepositoryORM } from "../../src/infra/repository/AccountRepository";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import GetAccount from "../../src/application/usecase/GetByID";
import MailerGateway, { MailerGatewayConsole } from "../../src/infra/gateway/MailerGateway";
import Signup from "../../src/application/usecase/Signup";

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    const accountDAO = new AccountRepositoryDatabase(connection);
    const mailerGateway: MailerGateway = {
        async send(subject: string, recipient: string, message: string): Promise<void> {}
    };
    signup = new Signup(accountDAO, mailerGateway);
    getAccount = new GetAccount(accountDAO);
});

test("Deve criar a conta", async function () {
    const input = {
        name: "EDENILSON SOUZA",
        email: `edenilson.sza+${Math.random()}@gmail.com`,
        phone: "79999889371",
        cordx: "123",
        cordy: "123"
    };
    const outputSignup = await signup.execute(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.phone).toBe(input.phone);
});

test("Não deve criar uma conta se o nome for inválido", async function () {
    const input = {
        name: "Edenilson",
        email: `edenilson.sza+${Math.random()}@gmail.com`,
        phone: "79999889371",
        cordx: "123",
        cordy: "123"
    };
    await expect(() => signup.execute(input)).rejects.toThrow(new Error("Nome inválido"));
});

test("Não deve criar uma conta se o email for inválido", async function () {
    const input = {
        name: "EDENILSON SOUZA",
        email: `edenilson.sza+${Math.random()}gmail.com`,
        phone: "79999889371",
        cordx: "123",
        cordy: "123"
    };
    await expect(() => signup.execute(input)).rejects.toThrow(new Error("Email inválido"));
});

test("Não deve criar uma conta se o telefone for inválido", async function () {
    const input = {
        name: "EDENILSON SOUZA",
        email: `edenilson.sza+${Math.random()}@gmail.com`,
        phone: "7999988937",
        cordx: "123",
        cordy: "123"
    };
    await expect(() => signup.execute(input)).rejects.toThrow(new Error("Telefone inválido"));
});

test("Não deve criar uma conta se a conta já existe", async function () {
    const input = {
        name: "EDENILSON SOUZA",
        email: `edenilson.sza+${Math.random()}@gmail.com`,
        phone: "79999889371",
        cordx: "123",
        cordy: "123"
    };
    await signup.execute(input);
    await expect(() => signup.execute(input)).rejects.toThrow(new Error("Conta já existe"));
});

afterEach(async () => {
    await connection.query("DELETE from desfacijuri.account WHERE email LIKE $1 AND phone = $2", ["edenilson.sza", "79999889371"]);
    await connection.close();
});
