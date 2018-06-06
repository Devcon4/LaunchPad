import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { interval, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { PostStateService } from '../../firebaseDataService/post-state.service';
import { PostService } from '../../firebaseDataService/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  constructor(public postState: PostStateService, private psotService: PostService) { }

  ngOnInit() {
    this.psotService.collection.subject.subscribe(v => console.log(v));
  }
}
