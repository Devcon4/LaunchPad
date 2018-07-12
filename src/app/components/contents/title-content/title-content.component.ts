import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { ContentKey } from '../../post-editor/post-editor.component';
import { Content } from '../../../models/content';
import { Action } from '../../../helpers/action';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-title-content',
  templateUrl: './title-content.component.html',
  styleUrls: ['./title-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ContentKey('Title')
export class TitleContentComponent {

  @Input() content: Action<Content> = new Action();
  
  @HostBinding(`class`) widthClass;
  
  constructor() {
    this.content.subject.pipe(filter(c => !!c)).subscribe(c => {
      console.log('set width!');
      this.widthClass = `width-${c.width}`;
    });
  }
}
