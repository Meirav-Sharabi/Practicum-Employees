import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [],
    imports: [
        MatExpansionModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        AsyncPipe,
        MatTooltipModule
    ],
    exports: [
        MatExpansionModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        AsyncPipe,
        MatTooltipModule
    ],
  })
  export class RoleFormModule { }
  