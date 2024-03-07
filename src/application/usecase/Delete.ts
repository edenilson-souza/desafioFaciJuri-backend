import AccountRepository from "../../infra/repository/AccountRepository";

export default class DeleteUseCase {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(accountId: string) {
        const account = await this.accountRepository.getById(accountId);
        if (!account) throw new Error("Conta não existe");
        await this.accountRepository.delete(account);
        return {
            accountId: account.accountId
        };
    }
}
