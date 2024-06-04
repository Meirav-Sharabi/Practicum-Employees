import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RoleFormComponent } from "../components/role-form/role-form.component";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
    declarations: [],
    imports: [
      FormsModule, 
      CommonModule, 
      MatInputModule, 
      ReactiveFormsModule, 
      RoleFormComponent, 
      MatSelectModule, 
      MatFormFieldModule, 
      MatButtonModule, 
      MatExpansionModule, 
      MatIconModule, 
      MatDialogModule, 
      MatDatepickerModule,
      MatTooltipModule
    ],
    exports: [
      FormsModule, 
      CommonModule, 
      MatInputModule, 
      ReactiveFormsModule, 
      RoleFormComponent, 
      MatSelectModule, 
      MatFormFieldModule, 
      MatButtonModule, 
      MatExpansionModule, 
      MatIconModule, 
      MatDialogModule, 
      MatDatepickerModule,
      MatTooltipModule
    ],
  })
  export class EmployeeFormModule { }
  