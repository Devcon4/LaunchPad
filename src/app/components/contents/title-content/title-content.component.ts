import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { content } from '../../post-editor/post-editor.component';

@Component({
  selector: 'app-title-content',
  templateUrl: './title-content.component.html',
  styleUrls: ['./title-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@content('Title')
export class TitleContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
