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
        const cordX = "123";
        const cordY = "123";

        const account = Account.create(name, email, phone, cordX, cordY);

        expect(account.getName()).toBe(name.toUpperCase());
        expect(account.getEmail()).toBe(email);
        expect(account.getPhone()).toBe(phone);

        expect(account.accountId).toBe("123-123-123-123-123");
    });

    it("should restore an account with provided details", () => {
        const accountId = "existingAccountId";
        const name = "Jane Smith";
        const email = "jane@example.com";
        const phone = "79999889371";

        const account = Account.restore(accountId, name, email, phone, "123", "123");

        expect(account.getName()).toBe(name.toUpperCase());
        expect(account.getEmail()).toBe(email.toLowerCase());
        expect(account.getPhone()).toBe(phone);
        expect(account.accountId).toBe(accountId);
    });

    it("should update name", () => {
        const account = Account.create("John Doe", "john@example.com", "79999889371", "123", "123");
        const newName = "John Smith";
        account.setName(newName);

        expect(account.getName()).toBe(newName.toUpperCase());
    });

    it("should update phone", () => {
        const account = Account.create("John Doe", "john@example.com", "79999889371", "123", "123");
        const newPhone = "79999889372";
        account.setPhone(newPhone);

        expect(account.getPhone()).toBe(newPhone);
    });

    it("should update account", () => {
        const account = Account.create("John Doe", "email@email.com", "79999889371", "123", "123");

        const newData = {
            name: "John Smith",
            email: "mail@mail.com",
            phone: "79999889372",
            cordx: "456",
            cordy: "456"
        };

        account.update(newData);
        account.setCordX(newData.cordx);
        account.setCordY(newData.cordy);

        expect(account.getName()).toBe(newData.name.toUpperCase());
        expect(account.getEmail()).toBe(newData.email);
        expect(account.getPhone()).toBe(newData.phone);
        expect(account.getCordX()).toBe(account.getCordX());
        expect(account.getCordY()).toBe(account.getCordY());
    });
});

describe("Account - Validation", () => {
    it("should throw an error if name is invalid", () => {
        const name = "";
        const email = "john@example.com";
        const phone = "79999889371";
        const cordX = "123";
        const cordY = "123";

        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("Nome é obrigatório"));
    });

    it("should throw an error if name is invalid", () => {
        const name = undefined;
        const email = "john@example.com";
        const phone = "79999889371";
        const cordX = "123";
        const cordY = "123";

        //@ts-ignore
        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("Nome é obrigatório"));
    });

    it("should throw an error if name is invalid", () => {
        const name = "dsadas dasdas";
        const email = undefined;
        const phone = "79999889371";
        const cordX = "123";
        const cordY = "123";

        //@ts-ignore
        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("Email é obrigatório"));
    });

    it("should throw an error if name is invalid", () => {
        const name = "dsadas";
        const email = "john@example.com";
        const phone = "79999889371";
        const cordX = "123";
        const cordY = "123";

        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("Nome inválido"));
    });

    it("should throw an error if coords is invalid", () => {
        const name = "dsadas dasdsa";
        const email = "john@example.com";
        const phone = "79999889371";
        const cordX = "";
        const cordY = undefined;

        //@ts-ignore
        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("CordX e CordY são obrigatórios"));
    });

    it("should throw an error if coords is invalid", () => {
        const name = "dsadas dsa";
        const email = "john@example.com";
        const phone = "79999889371";
        const cordX = "";
        const cordY = "";

        //@ts-ignore
        expect(() => Account.create(name, email, phone, cordX, cordY)).toThrow(new Error("CordX e CordY são obrigatórios"));
    });
});
