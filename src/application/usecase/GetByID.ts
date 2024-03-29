import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetByIDUseCase {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(accountId: string) {
        const account = await this.accountRepository.getById(accountId);
        if (!account) throw new Error("Conta não existe");
        return {
            accountId: account.accountId,
            name: account.getName(),
            email: account.getEmail(),
            phone: account.getPhone(),
            cordx: account.getCordX(),
            cordy: account.getCordY()
        };
    }
}
