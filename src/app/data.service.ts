import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from './post';
import { pipe, of, Observable, Subscription } from 'rxjs';
import { Action } from './action';
import { PostStateService } from './post-state.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http, private postState: PostStateService) { }

  // Incase I need to implement stuff later.
  dataHook = <T>(obs: Observable<T>) => {
    return obs.pipe(
    );
  };

  actionService = <T, U extends Action<T>>(service: U) => {
    return (obs: Observable<T>) => {
      let sub = obs.subscribe(d => service.state = d);
      return obs;
    }
  }

  logger = (name: string, args: any) => <T>(obs: Observable<T>) => {
    return obs.pipe(
      tap(o => {
        console.groupCollapsed(`DataService: ${name}`);
        console.log(...args);
        console.log(o);
        console.groupEnd();
      }),
    );
  };

  getPostsByUserId(userId: number, ...args: any[]) { 
    return of([
      new Post({
        title: 'Test-1',
        shortDesc: 'A demo post mainly for mobile.',
        longDesc: 'A test post to show how cards should layout. This is a longer description that is actually more of a preview of the post and is ment more for desktop users.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit quae nihil sequi quaerat impedit quod, accusamus saepe totam sunt quidem minus dolores sint alias fugiat! Itaque fugit eveniet saepe, dolore commodi soluta vero nesciunt culpa, a distinctio ex. Dolores architecto molestias consectetur magnam ipsa suscipit atque nemo possimus eaque?'
      }),
      new Post({
        title: 'Test-2',
        shortDesc: 'A demo post mainly for mobile.',
        longDesc: 'A test post to show how cards should layout. This is a longer description that is actually more of a preview of the post and is ment more for desktop users.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit quae nihil sequi quaerat impedit quod, accusamus saepe totam sunt quidem minus dolores sint alias fugiat! Itaque fugit eveniet saepe, dolore commodi soluta vero nesciunt culpa, a distinctio ex. Dolores architecto molestias consectetur magnam ipsa suscipit atque nemo possimus eaque?'
      }),
      new Post({
        title: 'Test-3',
        shortDesc: 'A demo post mainly for mobile.',
        longDesc: 'A test post to show how cards should layout. This is a longer description that is actually more of a preview of the post and is ment more for desktop users.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit quae nihil sequi quaerat impedit quod, accusamus saepe totam sunt quidem minus dolores sint alias fugiat! Itaque fugit eveniet saepe, dolore commodi soluta vero nesciunt culpa, a distinctio ex. Dolores architecto molestias consectetur magnam ipsa suscipit atque nemo possimus eaque?'
      }),
      new Post({
        title: 'Test-3',
        shortDesc: 'A demo post mainly for mobile.',
        longDesc: 'A test post to show how cards should layout. This is a longer description that is actually more of a preview of the post and is ment more for desktop users.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit quae nihil sequi quaerat impedit quod, accusamus saepe totam sunt quidem minus dolores sint alias fugiat! Itaque fugit eveniet saepe, dolore commodi soluta vero nesciunt culpa, a distinctio ex. Dolores architecto molestias consectetur magnam ipsa suscipit atque nemo possimus eaque?'
      }),
      new Post({
        title: 'Test-4',
        shortDesc: 'A demo post mainly for mobile.',
        longDesc: 'A test post to show how cards should layout. This is a longer description that is actually more of a preview of the post and is ment more for desktop users.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit quae nihil sequi quaerat impedit quod, accusamus saepe totam sunt quidem minus dolores sint alias fugiat! Itaque fugit eveniet saepe, dolore commodi soluta vero nesciunt culpa, a distinctio ex. Dolores architecto molestias consectetur magnam ipsa suscipit atque nemo possimus eaque?'
      }),
    ]).pipe(this.dataHook, this.logger('getPostsByUserId', arguments), this.actionService(this.postState));
  }
}
