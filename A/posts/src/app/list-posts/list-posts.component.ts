import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

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
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  //dependency injection.
  //adding "public" will automatically create a new proerty inside the class and assign the value to it.
  constructor(public postService: PostService) {}

  // ngOnInit() {
  //   //this.posts = this.postService.getPosts();
  //   // this.postService.getPosts();
  //   // this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
  //   //   this.posts = posts;
  //   // });
  // }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onChangedPage(event: PageEvent) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
