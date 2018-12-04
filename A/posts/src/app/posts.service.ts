import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//this is done instead of mentioning the service in "providers" section of app.module.
//mentioning root makes sure the service is available at root level and only one isntance of the service is created.
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); //subject is similar to event emitter

  constructor(public http: HttpClient, private router: Router) {}

  getPosts() {
    //no need to unsubscribe http calls since it is handled internally.
    // return this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    //           .subscribe((postData) => {
    //             this.posts = postData.posts;//no need to spread since it comes from server.
    //             this.postsUpdated.next([...this.posts]);
    //           });
    //return [...this.posts]; //this is called "spread". in JS and TS objects are referenced. So many varibales may point to the same object. Changes in one may refelct in another. To prevetn this, we use "spread". It is equivalent to creating a new object var newPosts = this.posts; return newPosts.
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    //return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/" + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
  //   const post: Post = {id: null, title: title, content: content};
  //   this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
  //     .subscribe((responseData) => {
  //       console.log(responseData.message);
  //       this.posts.push(post);
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }
  const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
    }

    updatePost(id: string, title: string, content: string) {
      const post: Post = { id: id, title: title, content: content};
      this.http.put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(response => {
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost(postId: string) {
      this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
          const updatedPosts = this.posts.filter(post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
    }
}
