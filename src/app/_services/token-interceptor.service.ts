import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
   
    let reqClone;

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      reqClone = req.clone({ headers });
    } else {
      reqClone = req;
    }

    return next.handle(reqClone);
  }
}
