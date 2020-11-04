import {Component, OnInit} from '@angular/core'
import {PostService} from '../admin/shared/services/post.service'
import {Observable} from 'rxjs'
import {IPost} from '../shared/interfaces'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<IPost[]>

  constructor(
    private postsService: PostService
  ) {
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll()
  }

}
