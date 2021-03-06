import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IFbResponse, IPost} from '../../../shared/interfaces'
import {environment} from '../../../../environments/environment'
import {map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post(`${environment.dbUrl}posts.json`, post)
      .pipe(
        map((response: IFbResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        })
      )
  }

  getAll(): Observable<IPost[]> {
    return this.http.get(`${environment.dbUrl}posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          }
        })
      )
  }

  getId(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.dbUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        })
      )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}posts/${id}.json`)
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.dbUrl}/posts/${post.id}.json`, post)
  }
}
