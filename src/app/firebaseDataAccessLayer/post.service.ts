import { Injectable, Inject } from '@angular/core';
import { Network } from "./Network";
import { Post } from '../models/post';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { PostStateService } from './post-state.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends Network<Post> {

  constructor(afs: AngularFirestore, private profileService: ProfileService, postStateService: PostStateService) {
    super({
      name: 'Posts',
      doc: postStateService,
      parent: profileService,
    }, afs);
  }
}
