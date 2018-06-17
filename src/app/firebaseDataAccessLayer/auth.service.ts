import { Injectable, Inject } from '@angular/core';
import { Network } from './Network';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileService } from './profile.service';
import { Profile } from '../models/profile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Network<User> {

  constructor(@Inject(AngularFirestore) afs: AngularFirestore, private router: Router, private profileService: ProfileService, private afAuth: AngularFireAuth) {
    super({
      name: 'Users'
    }, afs);
  }

  public googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log(credential);

        let user = new User({
          displayName: credential.user.displayName,
          email: credential.user.email,
          photoURL: credential.user.photoURL
        });

        this.upsertDoc(credential.user.uid, user);
        
        let profile = new Profile({
          firstName: credential.user.displayName.split(' ')[0],
          lastName: credential.user.displayName.split(' ')[1]
        });

        this.profileService.upsertDoc(credential.user.uid, profile);

        this.getDoc(credential.user.uid);
        return user;
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
