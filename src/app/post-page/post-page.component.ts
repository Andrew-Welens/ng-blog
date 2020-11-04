import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {PostService} from '../admin/shared/services/post.service'
import {IPost} from '../shared/interfaces'
import {Observable} from 'rxjs'
import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.styl']
})
export class PostPageComponent implements OnInit {

  post$: Observable<IPost>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService
  ) {
  }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getId(params['id'])
        })
      )
  }

}
