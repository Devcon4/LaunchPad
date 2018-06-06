import { Injectable } from '@angular/core';
import { Action } from '../helpers/action';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostStateService {

  currentPost: Action<Post> = new Action();
  postList: Action<Post[]> = new Action();
}
