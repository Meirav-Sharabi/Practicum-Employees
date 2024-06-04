import { FormControl } from "@angular/forms";

export function isValidIdNumber(control: FormControl): { [key: string]: any } | null {
    const idNumber = control.value;

    if (!idNumber || isNaN(Number(idNumber))) {
        return { 'invalidIdNumber': true };
    }
    const checkDigit = Number(idNumber.toString().charAt(8));
    let sum = 0;

    for (let i = 0; i < 8; i++) {
        let digit = Number(idNumber.toString().charAt(i));
        if (i % 2 === 0) {
            digit *= 1;
        } else {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    if ((sum + checkDigit) % 10 === 0)
        return null;
    else
        return { 'invalidIdNumber': true };
}
