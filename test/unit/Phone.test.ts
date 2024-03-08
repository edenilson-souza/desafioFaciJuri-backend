import Phone from "../../src/domain/vo/Phone";

test.each(["97456321558", "71428793860", "87748248800"])("Deve testar se o telefone é válido: %s", function (phone: string) {
    expect(new Phone(phone)).toBeDefined();
});

test.each(["8774824880", null, undefined, "11111111111"])("Deve testar se o telefone é inválido: %s", function (phone: any) {
    expect(() => new Phone(phone)).toThrow(new Error("Telefone inválido"));
});
