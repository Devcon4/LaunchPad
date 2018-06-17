import { MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebaseDataAccessLayer/firebase.module';

import { PipeablePipe } from './pipes/pipeable.pipe';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfilePostComponent } from './components/profile-post/profile-post.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    PipeablePipe,
    ProfilePostComponent,
    ProfileHeaderComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
