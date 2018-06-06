import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericStateServiceService } from './generic-state-service.service';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { PostService } from './post.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [
    GenericStateServiceService,
    PostService
  ],
  exports: [
    GenericStateServiceService,
    PostService
  ]
})
export class FirebaseModule { }
