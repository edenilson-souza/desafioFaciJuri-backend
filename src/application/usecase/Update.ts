import AccountRepository from "../../infra/repository/AccountRepository";

export default class UpdateUseCase {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(accountId: string, data: any) {
        const account = await this.accountRepository.getById(accountId);
        if (!account) throw new Error("Conta não existe");

        account.update(data);

        await this.accountRepository.update(account);
        return {
            accountId: account.accountId
        };
    }
}
