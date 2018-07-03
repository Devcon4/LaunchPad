import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, ElementRef } from '@angular/core';
import { PostStateService } from '../../firebaseDataAccessLayer/post-state.service';
import { ContentService } from '../../firebaseDataAccessLayer/content.service';
import { OperatorFunction, Observable } from 'rxjs';
import { Content, ContentType, IDynamicable } from '../../models/content';
import { mergeMap, mergeAll, map, tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ContentStateService } from '../../firebaseDataAccessLayer/content-state.service';
import { Post } from '../../models/post';
import { PostService } from '../../firebaseDataAccessLayer/post.service';


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent implements OnInit {

  constructor(
    public postState: PostStateService,
    public postService: PostService,
    public contentState: ContentStateService,
    public contentService: ContentService,
    private cfr: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute
  ) { }

  @ViewChild('content', {
    read: ViewContainerRef
  }) contentRef: ViewContainerRef;

  ngOnInit() {
    // this.contentService.createDoc(new Content({
    //   type: 'paragraph',
    //   text: 'some text',
    //   width: 12
    // }));

    this.activatedRoute.params.subscribe(p => {
      const id = p['id'];

      if (!id) {
        if (!this.postState.state) {
          this.postState.state = new Post({});
        }

        this.contentState.list.state = [
          new Content({
            type: 'Title',
            text: 'Enter a title!'
          })
        ];
      } else {
        this.postService.getDoc(id);
      }
    });

    this.contentService.list.subject.pipe(
      filter(c => !!c && c.length > 0),
      // tap(c => this.contentRef.clear()),
      mergeAll(),
      map(c => Object.assign(c, { component: ContentType[c.type] })),
      this.dynamicRender
    ).subscribe();

  }

  dynamicRender = <T, U extends IDynamicable<Type<T>>>(obs: Observable<U>) => {

    const sub = obs.pipe(tap(c => {
      const compFactory = this.cfr.resolveComponentFactory(c.component);
      const contentComp = this.contentRef.createComponent(compFactory);
      contentComp.instance['data'] = c;
    })).subscribe();

    return obs;
  }

}

export function content(key: string) {
  return <T extends { new(...args: any[]): {} }>(constructor: T) => {
    Reflect.set(ContentType, key, constructor);
  }
}
