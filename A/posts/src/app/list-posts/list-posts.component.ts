import { Component, Input } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})

export class ListPostsComponent {
  // posts = [
  //   {title: 'First post', content: 'first post content'},
  //   {title: 'second post', content: 'second post content'},
  //   {title: 'last post', content: 'last post content'}
  // ]
  @Input() posts: Post[] = [];
}
