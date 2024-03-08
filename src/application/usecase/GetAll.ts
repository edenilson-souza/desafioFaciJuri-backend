import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAllUseCase {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(page: number, limit: number, filters: any) {
        const accounts = await this.accountRepository.getAll(page, limit, filters);
        return accounts.map(account => {
            return {
                accountId: account.accountId,
                name: account.getName(),
                email: account.getEmail(),
                phone: account.getPhone(),
                cordx: account.getCordX(),
                cordy: account.getCordY()
            };
        });
    }
}
