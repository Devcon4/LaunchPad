import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../firebaseDataAccessLayer/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  login() {
    this.authService.googleLogin();
  }

  logout() {
    this.authService.signOut();
  }

}
