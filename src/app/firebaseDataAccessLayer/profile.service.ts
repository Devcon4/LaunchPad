import { Injectable, Inject } from '@angular/core';
import { Network } from './Network';
import { Profile } from '../models/profile';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Network<Profile> {

  constructor(@Inject(AngularFirestore) afs: AngularFirestore) {
    super({
      name: 'Profiles'
    }, afs);
  }
}
