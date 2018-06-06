import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CurrentProfileStateService } from './firebaseDataService/current-profile-state.service';
import { PipeablePipe } from './pipes/pipeable.pipe';
import { ProfilePostComponent } from './components/profile-post/profile-post.component';
import { PostStateService } from './firebaseDataService/post-state.service';
import { HttpModule } from '@angular/http';

import { MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { FirebaseModule } from './firebaseDataService/firebase.module';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    PipeablePipe,
    ProfilePostComponent,
    ProfileHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatMenuModule,
    FirebaseModule
  ],
  providers: [
    CurrentProfileStateService,
    PostStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
