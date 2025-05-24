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

export interface Tag {
  post_id : string,
  tag : string
}

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

  postLike(postId : string, username : string) {
    return this.http.post<Like>(`${this.apiUrl}/${postId}/like`, {
      username : username
    })
  }

  postTag(postId : string, tag : string) {
    return this.http.post<Tag>(`${this.apiUrl}/${postId}/tags`, {
      tag : tag
    })
  }

  getTags(postId : string) {
    return this.http.get<Tag[]>(`${this.apiUrl}/${postId}/tags`);
  }

  getPostsBySearchAndTag(search : string){
    return this.http.get<Post[]>(`${this.apiUrl}/search/${search}`);
  }

}
