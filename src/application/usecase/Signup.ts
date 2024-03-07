import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import AccountRepository from "../../infra/repository/AccountRepository";

// Use case
export default class Signup {
    constructor(readonly accountRepository: AccountRepository, readonly mailerGateway: MailerGateway) {}

    async execute(input: any) {
        const existingAccount = await this.accountRepository.getByEmail(input.email);
        if (existingAccount) throw new Error("Conta já existe");

        const account = Account.create(input.name, input.email, input.phone);
        await this.accountRepository.save(account);
        await this.mailerGateway.send("Bem vindo!", account.getEmail(), "Use o link para confirmar seu email: ...");
        return {
            accountId: account.accountId
        };
    }
}
