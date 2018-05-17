import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized, Route } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '*',
    redirectTo: 'profile'
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
