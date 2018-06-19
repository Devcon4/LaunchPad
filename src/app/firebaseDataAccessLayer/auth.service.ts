import { Injectable, Inject } from '@angular/core';
import { Network } from './Network';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user';
import { auth, User as FUser } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileService } from './profile.service';
import { Profile } from '../models/profile';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Network<User> {

  constructor(@Inject(AngularFirestore) afs: AngularFirestore, private router: Router, private profileService: ProfileService, private afAuth: AngularFireAuth) {
    super({
      name: 'Users',
      skipGetList: true
    }, afs);

    this.afAuth.authState.subscribe(u => this.doc.state = this.toUser(u));
  }

  public googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private toUser(u: FUser = {} as FUser) {
    return new User({
      displayName: u.displayName,
      email: u.email,
      photoURL: u.photoURL,
      id: u.uid
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        let user = this.toUser(credential.user);

        this.createDoc(user, credential.user.uid);
        
        this.profileService.exists(credential.user.uid).subscribe(b => {
          if(!b) {
            let profile = new Profile({
              displayName: credential.user.displayName,
            });
    
            this.profileService.createDoc(profile, credential.user.uid);
          }
        });

        this.getDoc(credential.user.uid);
        return user;
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.doc.state = undefined;
  }
}
