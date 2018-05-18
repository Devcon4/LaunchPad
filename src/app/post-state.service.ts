import { Injectable } from '@angular/core';
import { Action } from './action';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostStateService extends Action<Post[]> {

  constructor() {
    super();
  }
}
