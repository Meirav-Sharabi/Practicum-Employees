// external-validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateRoleId(control: AbstractControl, roleGroups: any[]): ValidationErrors | null {
  const roleId = control.value;
  const existingRoles = roleGroups.map(group => group.value.roleId);

  if (control.dirty && existingRoles.includes(roleId)) {
    return { roleAlreadyExists: 'Role already exists in the list' };
  }

  return null;
}
