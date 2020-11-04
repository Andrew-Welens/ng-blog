import {Pipe, PipeTransform} from '@angular/core'
import {IPost} from '../../../shared/interfaces'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(post: IPost[], search = ''): IPost[] {
    return post.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
  }

}
