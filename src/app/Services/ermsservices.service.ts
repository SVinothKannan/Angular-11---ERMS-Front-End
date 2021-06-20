import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AddEmployeeModel } from '../Models/EmployeeModel.Model';
import { User } from '../Models/Users.Models';

@Injectable({
  providedIn: 'root'
})
export class ERMSServices {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  UserAuthentication(EmployeeObjects): Observable<User> {
    let Userdetails = new User();
    return this.http.post<any[]>('AutheticateUsers/login', EmployeeObjects).pipe(
      map((users) => {
        Userdetails.EmpName = users["empName"];
        Userdetails.Role = users["role"];
        Userdetails.Token = users["token"];
        Userdetails.UserName = users["empName"];
        sessionStorage.setItem('currentUser', JSON.stringify(Userdetails));
        this.currentUserSubject.next(Userdetails);
        return Userdetails;
      }),
      catchError(this.handleError)
    )
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  CreateEmployee(EmployeeObject): Observable<any> {
    debugger
    return this.http.post('AddEmployees/ObjemployeeModel', EmployeeObject).pipe(catchError(this.handleError));
  }

  getAllUsers(EmpId = 0): Observable<any[]> {
    return this.http.get<any[]>('GetAllEmployees/' + EmpId).pipe(catchError(this.handleError));
  }

  GetEmployees(IsLinemgr = false): Observable<any[]> {
    return this.http.get<any[]>('GetEmployees/' + IsLinemgr).pipe(catchError(this.handleError));
  }

  GetEmployeesFilter(EmployeeObjects): Observable<any[]> {
    return this.http.post<any[]>('GetEmployeesFilter/objemployeeFilterModel', EmployeeObjects).pipe(catchError(this.handleError));
  }
  GetEmployeeProfiles(EmployeeObjects):Observable<any[]>{
    return this.http.post<any[]>('GetEmployeeProfiles/employeeModel',EmployeeObjects).pipe(catchError(this.handleError));
  }

  CreateComments(CommentsObject): Observable<any> {
    debugger
    return this.http.post('AddComments/Objcommentsmodel', CommentsObject).pipe(catchError(this.handleError));
  }

  getAllComments(CommentsId = 0, MinPage = 1, MaxPage = 10, IsTotalCount = false): Observable<any[]> {
    debugger
    let params = CommentsId + "," + MinPage + "," + MaxPage + "," + IsTotalCount;
    return this.http.get<any[]>('GetAllEComments/' + params).pipe(catchError(this.handleError));
  }

  getlocations(): Observable<any[]> {
    return this.http.get<any[]>("GetLocations").pipe(catchError(this.handleError));
  }

  getSkillSets(): Observable<any[]> {
    return this.http.get<any[]>("GetSkillSets").pipe(catchError(this.handleError));
  }

  DeleteEmployee(EmpId = 0): Observable<any> {
    return this.http.delete<any>('DeleteEmployee/' + EmpId).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    debugger
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = (error.status === 0 || error.message === undefined) ? "Backend Server is down or temporarily unavailable" : errorMessage;
    }
    return throwError(errorMessage);
  }
}
