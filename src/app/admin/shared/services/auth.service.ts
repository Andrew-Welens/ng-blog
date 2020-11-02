import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IFireBaseAuth, IUser} from '../../../shared/interfaces'
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {tap} from 'rxjs/operators'

@Injectable()

export class AuthService {
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
        tap(this.setToken)
      )
  }

  logOut() {
    this.setToken(null)
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
