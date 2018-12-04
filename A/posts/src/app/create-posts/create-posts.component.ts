import { Component, OnInit } from "@angular/core";
//import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../posts.service";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  isLoading = false;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); //no need to unsubcribe
  }

  onSavePost (form: NgForm) {
    //console.dir(postInput); // used to view all the properties of the object postInput by collapsing
    //this.newPost = postInput.value;

    //this.newPost = this.enteredText;
    if (form.invalid) {
      return;
    }
    if(this.mode === 'create') {
      this.postService.addPost(form.value.enteredTitle, form.value.enteredContent);
    } else {
      this.postService.updatePost(this.postId, form.value.enteredTitle, form.value.enteredContent);
    }
    //const post: Post = {title: form.value.enteredTitle, content: form.value.enteredContent};
    form.resetForm();
  }
}
