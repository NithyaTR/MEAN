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
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>(); //subject is similar to event emitter

  constructor(public http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    //no need to unsubscribe http calls since it is handled internally.
    // return this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    //           .subscribe((postData) => {
    //             this.posts = postData.posts;//no need to spread since it comes from server.
    //             this.postsUpdated.next([...this.posts]);
    //           });
    //return [...this.posts]; //this is called "spread". in JS and TS objects are referenced. So many varibales may point to the same object. Changes in one may refelct in another. To prevetn this, we use "spread". It is equivalent to creating a new object var newPosts = this.posts; return newPosts.
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(map((postData) => {
        return {posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }),
        maxPosts: postData.maxPosts
      };
      }))
      .subscribe(transformedPostsData => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts});
      });
  }

  getPost(id: string) {
    //return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>("http://localhost:3000/api/posts/" + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string, image: File) {
  //   const post: Post = {id: null, title: title, content: content};
  //   this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
  //     .subscribe((responseData) => {
  //       console.log(responseData.message);
  //       this.posts.push(post);
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }
  //const post: Post = { id: null, title: title, content: content };
  const postData = new FormData();
  postData.append('title', title);
  postData.append('content', content);
  postData.append('image', image, title);
    this.http
      .post<{ message: string, post: Post }>("http://localhost:3000/api/posts", postData)
      .subscribe(responseData => {
        // const id = responseData.post.id;
        // const post: Post = {id: id, title: title, content: content, imagePath: responseData.post.imagePath};
        // post.id = id;
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
      let postData: Post | FormData;
      if (typeof(image) === 'object') {
        postData = new FormData();
        postData.append('id', id);
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
      } else {
        postData = { id: id, title: title, content: content, imagePath: image};
      }
      this.http.put("http://localhost:3000/api/posts/" + id, postData)
        .subscribe(response => {
          // const updatedPosts = [...this.posts];
          // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
          // const post: Post = {
          //   id: id, title: title, content: content, imagePath: ''
          // };
          // updatedPosts[oldPostIndex] = post;
          // this.posts = updatedPosts;
          // this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
      return this.http.delete("http://localhost:3000/api/posts/" + postId);
        // .subscribe(() => {
        //   const updatedPosts = this.posts.filter(post => post.id !== postId);
        //   this.posts = updatedPosts;
        //   this.postsUpdated.next([...this.posts]);
        // });
    }
}
