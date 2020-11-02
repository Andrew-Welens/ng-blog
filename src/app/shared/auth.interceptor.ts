import {Injectable} from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {AuthService} from '../admin/shared/services/auth.service'
import {Router} from '@angular/router'
import {catchError, tap} from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuth()) {
      request = request.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(request)
      .pipe(
        tap(() => console.log('www')),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.auth.logOut()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }
}
