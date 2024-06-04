import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  // fetchData() {
  //   this.http.get('https://example.com/api/data', { responseType: 'text' })
  //     .subscribe(
  //       data => console.log(data),
  //       error => console.error('Error fetching data:', error)
  //     );
  // }
  private baseUrl = 'http://localhost:7149/api';

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employees`)
  }

  deleteEmployee(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Employees/${id}`)
  }
  addEmployee(employee: any): Observable<Employee> {
    // const employeeToAdd: Employee = {
    //   id:0,
    //   firstName:employee.firstName,
    //   lastName:employee.lastName,
    //   tz:employee.tz,
    //   startDate:employee.startDate,
    //   dateOfBirth:employee.dateOfBirth,
    //   roles:employee.roles,
    //   gender:employee.gender,
    //   activityStatus:true
    // };
    // console.log("to server",employeeToAdd)
    return this.http.post<Employee>(`${this.baseUrl}/Employees`,employee);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/Employees/${id}`)
  }
  updateEmployee(employee:any){
    return this.http.put<Employee>(`${this.baseUrl}/Employees/${employee.id}`,employee)

  }
}
