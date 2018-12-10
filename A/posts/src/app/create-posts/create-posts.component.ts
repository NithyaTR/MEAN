import { Component, OnInit } from "@angular/core";
//import { Post } from "../post.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../posts.service";
import { Post } from "../post.model";
//import { mimeType } from './mime-type.validator';

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
  form: FormGroup;
  imagePreview;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: Validators.required}),
      image: new FormControl(null, {validators: Validators.required})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath};
          //this.form.setValue({title: this.post.title, content: this.post.content});
          this.form.controls['title'].setValue(this.post.title);
          this.form.controls['content'].setValue(this.post.content);
          this.form.controls['image'].setValue(this.post.imagePath);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); //no need to unsubcribe
  }

  onSavePost () {
    //console.dir(postInput); // used to view all the properties of the object postInput by collapsing
    //this.newPost = postInput.value;

    //this.newPost = this.enteredText;
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    //const post: Post = {title: form.value.enteredTitle, content: form.value.enteredContent};
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
