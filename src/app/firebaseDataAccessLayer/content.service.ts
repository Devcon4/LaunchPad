import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { Network } from './Network';
import { AngularFirestore } from 'angularfire2/firestore';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends Network<Content> {

  constructor(public afs: AngularFirestore, private postService: PostService) {
    super({
      name: 'Content',
      parent: postService
    }, afs);
  }

}
