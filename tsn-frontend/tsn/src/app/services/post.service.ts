import {User} from './user.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Post {
  id : string,
  username : string,
  text: string,
  image : string,
  date : Date,
}

export interface Like {
  post_id : string,
  username : string
}

// export interface Tag {
//
// }

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http : HttpClient) {}

  createPost(post: Post) {
    return this.http.post<Post>(this.apiUrl, {
      username : post.username,
      text : post.text,
      image : post.image,
    });
  }

  getAllPosts() {
    return this.http.get<Post[]>(this.apiUrl)
  }

  getPostsFromUser(username : string) {
    return this.http.get<Post[]>(`${this.apiUrl}/${encodeURIComponent(username)}`)
  }

  getAllLikesOfPost(id: string) {
    return this.http.get<Like[]>(`${this.apiUrl}/likes/${id}`);
  }

}
