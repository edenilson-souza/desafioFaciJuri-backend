import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAllAccount {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(page: number, limit: number) {
        const accounts = await this.accountRepository.getAll(page, limit);
        return accounts.map(account => {
            return {
                accountId: account.accountId,
                name: account.getName(),
                email: account.getEmail(),
                phone: account.getPhone()
            };
        });
    }
}
