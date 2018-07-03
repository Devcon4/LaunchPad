import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { Network } from './Network';
import { AngularFirestore } from 'angularfire2/firestore';
import { PostService } from './post.service';
import { ContentStateService } from './content-state.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends Network<Content> {

  constructor(public afs: AngularFirestore, private postService: PostService, private contentState: ContentStateService) {
    super({
      name: 'Content',
      doc: contentState.doc,
      list: contentState.list,
      parent: postService
    }, afs);
  }

}
