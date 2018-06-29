import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, ElementRef } from '@angular/core';
import { PostStateService } from '../../firebaseDataAccessLayer/post-state.service';
import { ContentService } from '../../firebaseDataAccessLayer/content.service';
import { OperatorFunction, Observable } from 'rxjs';
import { Content, ContentType, IDynamicable } from '../../models/content';
import { mergeMap, mergeAll, map, tap, filter } from 'rxjs/operators';


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent implements OnInit {

  constructor(public postState: PostStateService, public contentService: ContentService, private cfr: ComponentFactoryResolver) { }

  @ViewChild('content', { 
    read: ViewContainerRef 
  }) contentRef: ViewContainerRef;

  ngOnInit() {
    // this.contentService.createDoc(new Content({
    //   type: 'paragraph',
    //   text: 'some text',
    //   width: 12
    // }));

    this.contentService.list.subject.pipe(
      filter(c => !!c && c.length > 0),
      // tap(c => this.contentRef.clear()),
      mergeAll(),
      map(c => Object.assign(c, {component: ContentType[c.type]})),
      this.dynamicRender
    ).subscribe();

  }

  dynamicRender = <T, U extends IDynamicable<Type<T>>>(obs: Observable<U>) => {
    
    let sub = obs.pipe(tap(c => {
      let compFactory = this.cfr.resolveComponentFactory(c.component);
      let content = this.contentRef.createComponent(compFactory);
      content.instance['data'] = c;
      console.log(content);
    })).subscribe();
  
    return obs;
  }

}

export function content(key: string) {
  return <T extends {new(...args:any[]):{}}>(constructor:T) => {
    Reflect.set(ContentType, key, constructor);
  }
}