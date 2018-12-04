import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPostsComponent } from "./list-posts/list-posts.component";
import { PostCreateComponent } from "./create-posts/create-posts.component";

const routes: Routes = [
  { path: '', component: ListPostsComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
