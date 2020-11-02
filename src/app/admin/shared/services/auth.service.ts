import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {IFireBaseAuth, IUser} from '../../../shared/interfaces'
import {Observable, Subject, throwError} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {catchError, tap} from 'rxjs/operators'

@Injectable()

export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'))
    if (new Date() > expDate) {
      this.logOut()
      return null
    }
    return localStorage.getItem('token')
  }

  logIn(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleErr.bind(this))
      )
  }

  logOut() {
    this.setToken(null)
  }

  private handleErr(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Почта не зарегистрирована')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
    }

    return throwError(error)
  }

  isAuth(): boolean {
    return !!this.token
  }

  private setToken(response: IFireBaseAuth | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('token', response.idToken)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
