import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [],
    imports: [
        DatePipe, 
        CommonModule, 
        MatSidenavModule, 
        MatSelectModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatFormField,
        MatOption, 
        MatButtonModule, 
        MatCardModule, 
        MatIconModule, 
        MatCheckboxModule, 
        MatSliderModule, 
        FormsModule, 
        MatDialogModule,
        MatProgressSpinnerModule,
        ProgressSpinnerModule
    ],
    exports: [
        DatePipe, 
        CommonModule, 
        MatSidenavModule, 
        MatSelectModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatFormField,
        MatOption, 
        MatButtonModule, 
        MatCardModule, 
        MatIconModule, 
        MatCheckboxModule, 
        MatSliderModule, 
        FormsModule, 
        MatDialogModule,
        MatProgressSpinnerModule,
        ProgressSpinnerModule
    ],
  })
  export class ListEmployeesModule { }
  