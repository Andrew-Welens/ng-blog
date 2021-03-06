import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {IUser} from '../../shared/interfaces'
import {AuthService} from '../shared/services/auth.service'
import {ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  msg: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['loginAgain']) {
          this.msg = 'Пожалуйста, авторизуйтесь чтобы продолжить'
        } else if (params['authFailed']) {
          this.msg = 'Сессия завершена'
        }
      })

    this.form = new FormGroup({
      email: new FormControl(null,
        [Validators.required,
          Validators.email]),
      password: new FormControl(null,
        [Validators.required,
          Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const USER: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.logIn(USER)
      .subscribe(() => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false
      }, () => this.submitted = false)
  }

}
