export default class Phone {
    private value: string;

    constructor(phone: string) {
        if (!this.validatePhone(phone)) throw new Error("Invalid phone");
        this.value = this.removeNonDigits(phone);
    }

    private validatePhone(rawPhone: string) {
        if (!rawPhone) return false;
        const phone = this.removeNonDigits(rawPhone);
        if (this.isInvalidLength(phone)) return false;
        if (this.hasAllDigitsEqual(phone)) return false;

        return true;
    }

    private removeNonDigits(phone: string) {
        return phone.replace(/\D/g, "");
    }

    private isInvalidLength(phone: string) {
        const PHONE_LENGTH = 11;
        return phone.length !== PHONE_LENGTH;
    }

    private hasAllDigitsEqual(phone: string) {
        const [firstPhoneDigit] = phone;
        return [...phone].every(digit => digit === firstPhoneDigit);
    }

    getValue() {
        return this.value;
    }
}
