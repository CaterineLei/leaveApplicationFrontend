import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.model';
import {LeaveForm} from '../models/leave-form.model'

@Injectable({
  providedIn: 'root'
})
export class LeaveApplicationService {
  public API = 'https://localhost:44347/api';
  public User_API = `${this.API}/Users`;
  public Leave_Form_API=`${this.API}/LeaveApplicationForms`;
  constructor(private http: HttpClient) { }
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.User_API);
  }
  
   saveLeaveForm(leaveForm: LeaveForm):Observable<LeaveForm> {
    let result: Observable<LeaveForm>;
    if (leaveForm.id) {
      result = this.http.put<LeaveForm>(
        `${this.Leave_Form_API}/${leaveForm.id}`,leaveForm);
    } else {
      result = this.http.post<LeaveForm>(this.Leave_Form_API, leaveForm);
    }
    return result;


   }

}
