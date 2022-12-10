import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayPosts } from './display-posts/display-posts.component'
import { PostDetailsComponent } from './post-details/post-details.component'

const routes: Routes = [
  {
    path: '', component: DisplayPosts,
  },
  {
    path: 'post-details', component: PostDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
