import { MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatStepperModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebaseDataAccessLayer/firebase.module';

import { PipeablePipe } from './pipes/pipeable.pipe';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfilePostComponent } from './components/profile-post/profile-post.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { HeaderComponent } from './components/header/header.component';
import { EditProfileComponent } from './components/modals/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    PipeablePipe,
    ProfilePostComponent,
    ProfileHeaderComponent,
    HeaderComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  entryComponents: [ EditProfileComponent ]
})
export class AppModule { }
