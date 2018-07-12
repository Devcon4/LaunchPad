import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, ElementRef } from '@angular/core';
import { PostStateService } from '../../firebaseDataAccessLayer/post-state.service';
import { ContentService } from '../../firebaseDataAccessLayer/content.service';
import { OperatorFunction, Observable, interval, of } from 'rxjs';
import { Content, ContentType, IDynamicable } from '../../models/content';
import { mergeMap, mergeAll, map, tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ContentStateService } from '../../firebaseDataAccessLayer/content-state.service';
import { Post } from '../../models/post';
import { PostService } from '../../firebaseDataAccessLayer/post.service';
import { ProfileService } from '../../firebaseDataAccessLayer/profile.service';


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
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  @ViewChild('content', {
    read: ViewContainerRef,
  }) contentRef: ViewContainerRef;

  ngOnInit() {
    // this.contentService.createDoc(new Content({
    //   type: 'paragraph',
    //   text: 'some text',
    //   width: 12
    // }));

    this.activatedRoute.params.subscribe(p => {
      console.log(p);
      const id = p['id'];
      const profileId = p['profileId'];

      if (!id) {
        if (!this.postState.state) {
          this.postState.state = new Post({});
          this.contentState.list.state = [
            new Content({
              type: 'Title',
              text: 'Enter a title!'
            })
          ];
        }

      } else {
        this.profileService.getDoc(profileId);
        this.postService.getDoc(id);
        this.contentService.getList();
      }
    });

    this.contentService.list.subject.pipe(
      filter(c => !!c && c.length > 0),
      tap(c => {
        console.log('clear!');
        this.contentRef.clear();
        console.log(c);
      })
    ).subscribe();

    this.contentService.list.subject.pipe(
      filter(c => !!c && c.length > 0),
      map(arr => arr.sort((a, b) => a.ordinal - b.ordinal)),
      mergeAll(),
      map(c => Object.assign(c, { component: ContentType[c.type] })),
      this.dynamicRender
    ).subscribe();
  }

  dynamicRender = <T, U extends IDynamicable<Type<T>>>(obs: Observable<U>) => {

    const sub = obs.pipe(tap(c => {
      const compFactory = this.cfr.resolveComponentFactory(c.component);
      const contentComp = this.contentRef.createComponent(compFactory);
      console.log(c);
      (<any>contentComp.instance).content.state = c;
      contentComp.changeDetectorRef.detectChanges();
    })).subscribe();

    return obs;
  }

}

export function ContentKey(key: string) {
  return <T extends { new(...args: any[]): {} }>(constructor: T) => {
    Reflect.set(ContentType, key, constructor);
  }
}
