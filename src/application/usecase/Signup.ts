import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import AccountRepository from "../../infra/repository/AccountRepository";

// Use case
export default class SignupUseCase {
    constructor(readonly accountRepository: AccountRepository, readonly mailerGateway: MailerGateway) {}

    async execute(input: any) {
        try {
            const existingAccount = await this.accountRepository.getByEmail(input.email);
            if (existingAccount) throw new Error("Conta já existe");

            const account = Account.create(input.name, input.email, input.phone);
            console.log(account);
            await this.accountRepository.save(account);
            await this.mailerGateway.send("Bem vindo!", account.getEmail(), "Use o link para confirmar seu email: ...");
            return {
                accountId: account.accountId
            };
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao criar conta");
        }
    }
}
