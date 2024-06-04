import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateEntryDate(startDate: FormControl,entryDate:any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const entryDate = new Date(control.value);

    if (entryDate < startDate) {
      return { entryDateInvalid: true };
    }

    return null;
  };
}
