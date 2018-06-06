import { Injectable, Inject } from '@angular/core';
import { Network } from './network';
import { Post } from '../models/post';
import { AngularFirestore } from 'angularfire2/firestore';
import { PostStateService } from './post-state.service';
import { IActionable } from '../helpers/action';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends Network<Post> {

  constructor(@Inject(AngularFirestore) afs: AngularFirestore, @Inject(PostStateService) postState: PostStateService) {
    super({
      name: 'Posts',
      collection: postState.postList,
      doc: postState.currentPost
    }, afs);
  }

  errorLog = <T>(obs: Observable<T>) => {
    obs.subscribe(undefined, err => console.error);
    return obs;
  }

  get(id: string) {
    this.afs.collection(this.name).doc(id).valueChanges().pipe(this.errorLog, this.subDoc);
  }

  getList() {
      this.afs.collection('/posts').valueChanges().pipe(this.subCol);
  }
}
