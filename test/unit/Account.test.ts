import crypto from "crypto";
import Account from "../../src/domain/entity/Account";

describe("Account", () => {
    beforeEach(() => {
        jest.spyOn(crypto, "randomUUID").mockReturnValue("123-123-123-123-123");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create an account with provided details", () => {
        const name = "John Doe";
        const email = "john@example.com";
        const phone = "79999889371";

        const account = Account.create(name, email, phone);

        expect(account.getName()).toBe(name);
        expect(account.getEmail()).toBe(email);
        expect(account.getPhone()).toBe(phone);
        expect(account.accountId).toBe("123-123-123-123-123");
    });

    it("should restore an account with provided details", () => {
        const accountId = "existingAccountId";
        const name = "Jane Smith";
        const email = "jane@example.com";
        const phone = "79999889371";

        const account = Account.restore(accountId, name, email, phone);

        expect(account.getName()).toBe(name);
        expect(account.getEmail()).toBe(email);
        expect(account.getPhone()).toBe(phone);
        expect(account.accountId).toBe(accountId);
    });

    it("should update name", () => {
        const account = Account.create("John Doe", "john@example.com", "79999889371");
        const newName = "John Smith";
        account.setName(newName);

        expect(account.getName()).toBe(newName);
    });

    it("should update phone", () => {
        const account = Account.create("John Doe", "john@example.com", "79999889371");
        const newPhone = "79999889372";
        account.setPhone(newPhone);

        expect(account.getPhone()).toBe(newPhone);
    });
});
