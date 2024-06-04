import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateDateOfBirth(control: AbstractControl): ValidationErrors | null {
  const dateOfBirth = new Date(control.value);
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  if (dateOfBirth >= eighteenYearsAgo) {
    return { dateOfBirthInvalid: true };
  }
  return null;
}
