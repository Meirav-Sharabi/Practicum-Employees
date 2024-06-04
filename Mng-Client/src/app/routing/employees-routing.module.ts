import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from '../components/list-employees/list-employees.component';
// import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
// import { NotFoundComponent } from './not-found/not-found.component';



const recipiesRoutes: Routes = [
  //{ path: '', redirectTo: 'all-employees', pathMatch: 'full' },
  { path: '', component: ListEmployeesComponent },
  // { path: 'add-employee', component: AddEmployeeComponent },
  // { path: 'edit-employee/:id', component: EditEmployeeComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(recipiesRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
