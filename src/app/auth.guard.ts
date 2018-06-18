import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './firebaseDataAccessLayer/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.doc.subject.pipe(
        take(1),
        tap(u => {
          if(!u) {
            console.log('not logged in!');
          } else {
            this.router.navigate(['/profile', {id: u.id}]);
          }
        }),
        // map to true so you can still nav even though your not logged in.
        map(u => true),
      );
  }
}
