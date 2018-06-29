import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { content } from '../../post-editor/post-editor.component';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@content('header')
export class HeaderContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
