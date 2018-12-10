import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPostsComponent } from "./list-posts/list-posts.component";
import { PostCreateComponent } from "./create-posts/create-posts.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

const routes: Routes = [
  { path: '', component: ListPostsComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
