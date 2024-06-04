import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:7149/api';

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Role`)
  }
  getRoleById(Id: number) {
    this.http.get(`${this.baseUrl}/Role/${Id}`)
  }
}
