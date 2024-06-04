import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateDateOfBirth } from '../../validators/dateOfBirthValidator';
import { isValidIdNumber } from '../../validators/tzValidator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { Employee, Gender, Role } from '../../models/employee.model';
import { RolesService } from '../../services/roles.service';
import { EmployeeFormModule } from '../../modules/employee-formModule';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [EmployeeFormModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;
  rolesNames: Role[] = [];
  filteringRoles: Number[] = [];
  lastSelectedIndex: number = 0;
  // selectedRoles: boolean[] = [];
  selectedRoles: { [roleId: number]: boolean } = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    private router: Router,
    private _employeeService: EmployeeService,
    private _roleService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }) { }

  ngOnInit(): void {
    this.initEmployeeForm();
    if (this.data.employee) {
      this.employeeForm.patchValue({
        ...this.data.employee,
        gender: this.data.employee.gender === 0 ? 'male' : 'female',
      });
    }
    this.employeeForm.updateValueAndValidity();
    this.loadRoles();
  }

  // init employee form
  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: [' ', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(5), Validators.maxLength(10)]],
      lastName: [' ', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(5), Validators.maxLength(10)]],
      tz: [' ', [Validators.required, Validators.pattern('^[0-9]{9}$'), isValidIdNumber]],
      dateOfBirth: ['', [Validators.required, validateDateOfBirth]],
      startDate: ['', Validators.required],
      gender: ['', Validators.required],
      roles: this.fb.array([])
    });

    if (this.data.employee?.roles.length > 0) {
      //Filling in the deductive values ​​in the set of roles
      const rolesFormArray = this.employeeForm.get('roles') as FormArray;
      rolesFormArray.clear();
      this.data.employee.roles.forEach(role1 => {
        rolesFormArray.push(this.fb.group({
          role: this.fb.group({
            roleId: [role1.roleId, Validators.required],
            isManagement: [role1.isManagement],
            startDate: [role1.startDate, Validators.required]
          })
        }));
      });
      this.employeeForm.updateValueAndValidity();
    }
  }

  // load roles
  loadRoles(): void {
    this._roleService.getRoles().subscribe({
      next: (res) => {
        this.rolesNames = res;
        this.filteringRoles = this.rolesNames.map(role => role.id);

        this.rolesNames.forEach(role => {
            this.selectedRoles[role.id] = false;
        });

        //on state edition
        if(this.data.employee){
          this.data.employee.roles.forEach(role => {
            this.selectedRoles[role.roleId] = true;
        });
        }
        console.log("select",this.selectedRoles)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  // add new role
  addRole() {
    const roles = this.employeeForm.get('roles') as FormArray;
    roles.push(this.fb.group({
      role: [' ']
    }));
  }

  get roles() {
    return this.employeeForm.controls["roles"] as FormArray;
  }

  // delete role
  onDelete(index: number) {
    
    // (this.employeeForm.controls["roles"] as FormArray)?.removeAt(index)
    // this.cdr.detectChanges();
    // console.log("index for delete",index)
    // try
    // console.log("before deleted",this.selectedRoles)

    // const rolesArray = this.employeeForm.get('roles') as FormArray;
    // const roleGroup = rolesArray.at(index) as FormGroup;
    // const roleId = roleGroup.get('role.roleId')?.value;
    
    // // שמירת התפקיד במשתנה לפני הסרתו
    // const deletedRole = rolesArray.at(index).value;
    
    // if (roleId) {
    //   this.selectedRoles[roleId] = false;
    // }
    
    // rolesArray.removeAt(index);
    // this.cdr.detectChanges();

    // console.log('Deleted Role:', deletedRole);

    // console.log("after deleted",this.selectedRoles)
    
    //try 2
     const rolesArray = this.employeeForm.get('roles') as FormArray;
     const deletedRole = rolesArray.at(index).get('role')?.value;
     if (deletedRole && deletedRole.roleId) {
         this.selectedRoles[deletedRole.roleId] = false;
     }
     rolesArray.removeAt(index);
     this.cdr.detectChanges();
     console.log("after",this.selectedRoles);
  }

  // submit employee
  submit(): void {
    console.log("bsdddd", this.employeeForm.value.roles)
    this.getInvalidControls()
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      formData.gender = this.employeeForm.get('gender')?.value == Gender.male ? 0 : 1;
      formData.roles = formData.roles.map((r: { [x: string]: any; }) => r["role"])
      if (this.data.employee) {
        formData.id = this.data.employee.id
        //הפניה לפונקצית עריכה
        this.editEmployee(formData);
      }
      else {
        //הפניה לפונקצית הוספה
        this.addEmployee(formData);
      }
    }
  }

  // add employee
  addEmployee(formData: {}) {
    this._employeeService.addEmployee(formData).subscribe({
      next: (res) => {
        this.openSnackBar('employee was added successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error("err", err);
        this.openSnackBar('employee was not added!');
      }
    })
  }

  // edit employee
  editEmployee(formData: {}) {
    this._employeeService.updateEmployee(formData).subscribe({
      next: (res) => {
        this.openSnackBar('employee was updated successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error("err", err);
        this.openSnackBar('employee was not updated!');
      }
    })
  }

  // validations
  getInvalidControls(): string[] {
    const invalidControls: string[] = [];
    const controls = this.employeeForm.controls;
    // fields employee
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName)) {
        const control = this.employeeForm.get(controlName);
        if (control && control.invalid) {
          invalidControls.push(controlName);
        }
      }
    }
    // fields roles employee
    const rolesArray = this.employeeForm.get('roles') as FormArray;
    for (let i = 0; i < rolesArray.length; i++) {
      const roleGroup = rolesArray.at(i) as FormGroup;
      const roleControls = roleGroup.value;
      if(roleControls.role==" "){
        invalidControls.push(`EmployeeRoles[${i}]`);
      }
      if (roleControls.role.startDate=="") {
        invalidControls.push(`EmployeeRoles[${i}].Start of Work Date`);
      }
      if(roleControls.role.roleId==''){
        invalidControls.push(`EmployeeRoles[${i}].role Name`);
      }
    }
    if (invalidControls.length > 0) {
      this.openErrorSnackBar('You have errors in fields: ' + invalidControls.join(', '));
    }
    return invalidControls;
  }

  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
  openSnackBar(message: string) {
    const snackBarRef = this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

  isRoleDisabled(roleId:number) {
    console.log("enter isRoleDisabled",roleId)
    if (this.selectedRoles[roleId]) {
      this.openErrorSnackBar("Role has already been selected , Try again!")
      return false;
    } else {
      this.selectedRoles[roleId] = true;
      console.log("this.selected",this.selectedRoles);
      return true;
    }
  }
}
