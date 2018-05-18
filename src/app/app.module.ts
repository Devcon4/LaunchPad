import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CurrentProfileStateService } from './current-profile-state.service';
import { PipeablePipe } from './pipeable.pipe';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { PostStateService } from './post-state.service';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    PipeablePipe,
    ProfilePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    CurrentProfileStateService,
    PostStateService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
