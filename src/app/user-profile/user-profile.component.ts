import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrentProfileStateService } from '../current-profile-state.service';
import { interval, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { PostStateService } from '../post-state.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  constructor(public currentProfileState: CurrentProfileStateService, public postState: PostStateService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPostsByUserId(0);
  }
}
