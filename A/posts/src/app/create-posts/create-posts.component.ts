import { Component } from "@angular/core";
//import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';

  constructor(public postService: PostService) {}
  onAddPost (form: NgForm) {
    //console.dir(postInput); // used to view all the properties of the object postInput by collapsing
    //this.newPost = postInput.value;

    //this.newPost = this.enteredText;
    if (form.invalid) {
      return;
    }
    //const post: Post = {title: form.value.enteredTitle, content: form.value.enteredContent};
    this.postService.addPost(form.value.enteredTitle, form.value.enteredContent);
    form.resetForm();
  }
}
