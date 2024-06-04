// external-validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validatePositionId(control: AbstractControl, positionGroups: any[]): ValidationErrors | null {
  const positionId = control.value;
  const existingPositions = positionGroups.map(group => group.value.positionId);

  if (control.dirty && existingPositions.includes(positionId)) {
    return { positionAlreadyExists: 'Position already exists in the list' };
  }

  return null;
}
