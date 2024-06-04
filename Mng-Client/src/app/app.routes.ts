import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full' },
    {path:'employees', loadChildren:()=>import('./employee.module').then(c=>c.EmployeeModule)},
    {path: '**', component: NotFoundComponent },

];