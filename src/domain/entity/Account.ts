import crypto from "crypto";
import Name from "../vo/Name";
import Email from "../vo/Email";
import Phone from "../vo/Phone";
import Coord from "../vo/Coord";

// Entity e atua como Raiz do Aggregate (Account<AR>, Name, Email, Phone)
export default class Account {
    private name: Name;
    private email: Email;
    private phone: Phone;
    private cordx: Coord;
    private cordy: Coord;

    private constructor(readonly accountId: string, name: string, email: string, phone: string, cordx: string, cordy: string) {
        this.name = new Name(name);
        this.email = new Email(email);
        this.phone = new Phone(phone);
        this.cordx = new Coord(cordx);
        this.cordy = new Coord(cordx);
    }

    static create(name: string, email: string, phone: string, cordx: string, cordy: string) {
        const accountId = crypto.randomUUID();
        return new Account(accountId, name, email, phone, cordx, cordy);
    }

    static restore(accountId: string, name: string, email: string, phone: string, cordx: string, cordy: string) {
        return new Account(accountId, name, email, phone, cordx, cordy);
    }

    update(data: any) {
        if (data.name) this.name = new Name(data.name);
        if (data.email) this.email = new Email(data.email);
        if (data.phone) this.phone = new Phone(data.phone);
        if (data.cordx) this.cordx = data.cordx;
        if (data.cordy) this.cordy = data.cordy;
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
    getCordX() {
        return this.cordx.getValue();
    }
    getCordY() {
        return this.cordy.getValue();
    }

    setName(name: string) {
        this.name = new Name(name);
    }
    setPhone(phone: string) {
        this.phone = new Phone(phone);
    }
    setCordX(cordx: string) {
        this.cordx = new Coord(cordx);
    }
    setCordY(cordy: string) {
        this.cordy = new Coord(cordy);
    }
}
