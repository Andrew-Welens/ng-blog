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
    return ''
  }

  logIn(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  logOut() {
  }

  isAuth(): boolean {
    return !!this.token
  }

  private setToken(response: IFireBaseAuth) {
    console.log(response)
  }
}
