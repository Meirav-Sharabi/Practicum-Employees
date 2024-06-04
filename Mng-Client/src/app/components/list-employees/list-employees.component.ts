import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ListEmployeesModule } from '../../modules/list-employeesModule';
@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModule],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent implements OnInit {
  constructor(
    private _employeeService: EmployeeService, 
    private router: Router, 
    private cdRef: ChangeDetectorRef, 
    private dialog: MatDialog) { }

  listEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  employee!: Employee;
  hasItems: boolean = false;

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe({
      next: (res) => {
        this.listEmployees = res;
        this.listEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName)); 
        this.filteredEmployees = [...this.listEmployees];
        this.hasItems = this.filteredEmployees.length > 0;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  removeEmployee(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.deleteEmployee(id).subscribe({
          next: (res) => {
            this.filteredEmployees = this.filteredEmployees.filter(e => e.id != id);
          },
          error: (err) => {
            console.error(err);
          }
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  openDialog(employee: Employee | undefined): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: {
        employee: employee
      },
      panelClass: 'dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addNewEmployee(): void {
    this.openDialog(undefined);
  }
  
  editEmployee(e: Employee) {
    console.log("employeeDetails",e)
    this.employee = { ...e };
    this.openDialog(e)
  }

  filterEmployees(): void {
    this.filteredEmployees = this.listEmployees.filter(employee => {
      const nameFilter = this.searchText === '' ||
        employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.tz.toLowerCase().includes(this.searchText.toLowerCase());
      return nameFilter;
    });

  }

  exportToExcel(): void {
    this._employeeService.getEmployees().subscribe(data => {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      XLSX.writeFile(workbook, 'employees.xlsx');
    });
  }
}
