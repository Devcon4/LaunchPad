import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized, Route } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { PostEditorComponent } from './components/post-editor/post-editor.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'profile',
  //   pathMatch: 'full'
  // },
  {
    path: 'profile/:id',
    component: UserProfileComponent
  },
  {
    path: 'postEditor/:profileId/:id',
    component: PostEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
