import {Component, OnInit, OnDestroy} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {PostService} from '../shared/services/post.service'
import {switchMap} from 'rxjs/operators'
import {IPost} from '../../shared/interfaces'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs'
import {AlertService} from '../shared/services/alert.service'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.styl']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: IPost
  submitted = false

  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getId(params['id'])
        })
      ).subscribe((post: IPost) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Пост был изменен')
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
