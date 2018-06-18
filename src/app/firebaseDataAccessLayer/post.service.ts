import { Injectable, Inject } from '@angular/core';
import { Network } from "./Network";
import { Post } from '../models/post';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends Network<Post> {

  constructor(@Inject(AngularFirestore) afs: AngularFirestore, @Inject(ProfileService) private profileService: ProfileService) {
    super({
      name: 'Posts',
      parent: profileService
    }, afs);
  }
}
