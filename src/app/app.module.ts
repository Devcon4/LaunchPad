import { MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatStepperModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ProfileCreatePostComponent } from './components/profile-create-post/profile-create-post.component';
import { CreatePostModalComponent } from './components/modals/create-post-modal/create-post-modal.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { HeaderContentComponent } from './components/contents/header-content/header-content.component';
import { ParagraphContentComponent } from './components/contents/paragraph-content/paragraph-content.component';
import { TitleContentComponent } from './components/contents/title-content/title-content.component';
import { ContentFabComponent } from './components/content-fab/content-fab.component';
import { ContenteditableDirective } from 'ng-contenteditable';

const modals = [
  EditProfileComponent,
  CreatePostModalComponent
];

const contents = [
  TitleContentComponent,
  ParagraphContentComponent,
  HeaderContentComponent
];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    PipeablePipe,
    ProfilePostComponent,
    ProfileHeaderComponent,
    HeaderComponent,
    EditProfileComponent,
    ProfileCreatePostComponent,
    CreatePostModalComponent,
    PostEditorComponent,
    HeaderContentComponent,
    ParagraphContentComponent,
    TitleContentComponent,
    ContentFabComponent,
    ContenteditableDirective
  ],
  imports: [
    BrowserAnimationsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
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
  entryComponents: [
    ...modals,
    ...contents
  ]
})
export class AppModule { }
