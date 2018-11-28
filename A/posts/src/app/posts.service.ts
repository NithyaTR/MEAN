import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

//this is done instead of mentioning the service in "providers" section of app.module.
//mentioning root makes sure the service is available at root level and only one isntance of the service is created.
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); //subject is similar to event emitter

  getPosts() {
    return [...this.posts]; //this is called "spread". in JS and TS objects are referenced. So many varibales may point to the same object. Changes in one may refelct in another. To prevetn this, we use "spread". It is equivalent to creating a new object var newPosts = this.posts; return newPosts.
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
