import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { content } from '../../post-editor/post-editor.component';

@Component({
  selector: 'app-paragraph-content',
  templateUrl: './paragraph-content.component.html',
  styleUrls: ['./paragraph-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@content('paragraph')
export class ParagraphContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
