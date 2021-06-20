import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/Users.Models';
import { ERMSServices } from './ermsservices.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authenticationService: ERMSServices) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const baseUrl = "http://localhost:57889/api/v1.0/Employee/";
    const currentUser = this.authenticationService.currentUserValue;
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`, headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: (currentUser && currentUser.Token) ? `Bearer ${currentUser.Token}` : ''
      })
    });
    return next.handle(apiReq);
  }
}