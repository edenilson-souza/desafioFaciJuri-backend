import crypto from "crypto";
import Name from "../vo/Name";
import Email from "../vo/Email";
import Phone from "../vo/Phone";

// Entity e atua como Raiz do Aggregate (Account<AR>, Name, Email, Phone)
export default class Account {
    private name: Name;
    private email: Email;
    private phone: Phone;

    private constructor(readonly accountId: string, name: string, email: string, phone: string) {
        this.name = new Name(name);
        this.email = new Email(email);
        this.phone = new Phone(phone);
    }

    static create(name: string, email: string, phone: string) {
        const accountId = crypto.randomUUID();

        return new Account(accountId, name, email, phone);
    }

    static restore(accountId: string, name: string, email: string, phone: string) {
        return new Account(accountId, name, email, phone);
    }

    getName() {
        return this.name.getValue();
    }

    getEmail() {
        return this.email.getValue();
    }

    getPhone() {
        return this.phone.getValue();
    }

    setName(name: string) {
        this.name = new Name(name);
    }

    setPhone(phone: string) {
        this.phone = new Phone(phone);
    }
}
