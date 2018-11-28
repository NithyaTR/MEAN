import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})

export class ListPostsComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First post', content: 'first post content'},
  //   {title: 'second post', content: 'second post content'},
  //   {title: 'last post', content: 'last post content'}
  // ]
  posts: Post[] = [];
  private postSub: Subscription;
  //dependency injection.
  //adding "public" will automatically create a new proerty inside the class and assign the value to it.
  constructor(public postService: PostService) {}

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
