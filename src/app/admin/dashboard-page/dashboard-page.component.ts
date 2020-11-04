import {Component, OnInit, OnDestroy} from '@angular/core'
import {IPost} from '../../shared/interfaces'
import {Subscription} from 'rxjs'
import {PostService} from '../shared/services/post.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.styl']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = []
  pSub: Subscription
  dSub: Subscription
  search = ''

  constructor(private postsService: PostService) {
  }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id)
      .subscribe(() => {
        this.posts = this.posts.filter(p => p.id !== id)
      })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
