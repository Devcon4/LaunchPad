import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, HostBinding, AfterViewInit, OnChanges } from '@angular/core';
import { ContentKey } from '../../post-editor/post-editor.component';
import { Content } from '../../../models/content';
import { empty, Observable } from 'rxjs';
import { Action } from '../../../helpers/action';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
@ContentKey('header')
export class HeaderContentComponent {

  @Input() content: Action<Content> = new Action();

  @HostBinding(`class`) widthClass;
  
  constructor() {
    this.content.subject.pipe(filter(c => !!c)).subscribe(c => {
      this.widthClass = `width-${c.width}`;
    });
  }
}
