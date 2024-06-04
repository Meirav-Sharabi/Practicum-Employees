import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { EmployeeRoles, Role } from '../../models/employee.model';
import { ControlValueAccessor } from '@angular/forms';
import { RoleFormModule } from '../../modules/role-formModule';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [RoleFormModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RoleFormComponent),
    multi: true
  }, provideNativeDateAdapter()]
})

export class RoleFormComponent implements ControlValueAccessor {

  constructor(private _roleService: RolesService, private fb: FormBuilder) { }
  roleForm!: FormGroup
  @Output() delete = new EventEmitter();
  @Output() roleName = new EventEmitter();
  @Input() startingDateWorking!: Date;
  role!: EmployeeRoles;
  roles: Role[] = []
  roleNames: Role[] = []

  ngOnInit() {
    this.loadRoles();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.role = obj;
      this.initRoleForm()
    }
    this.roleForm.valueChanges.subscribe(val => this.update())
  }

  // init role form
  initRoleForm(){
    this.roleForm = this.fb.group({
      roleId: [this.role?.roleId || '', Validators.required],
      isManagement: [this.role?.isManagement || false, Validators.required],
      startDate: [this.role?.startDate || '', [Validators.required, this.entryDateValidator()]]
    });
  }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.startingDateWorking);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
  }

  // load roles
  loadRoles() {
    this._roleService.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  // Choosing role
  ChoosingRole(event: any) {
    this.roleName.emit(event);
  }

  // remove role
  removeRole() {
    this.delete.emit(0);
  }

  // --------------Implementions for custemControl-------------- //
  
  removeRoleControl(index: number): void {
    // console.log("remove", index)
  }
  onChange: any = () => { };
  onTouch: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  update() {
    this.onChange(this.roleForm.value);
    this.onTouch();
  }

}
