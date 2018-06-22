import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Action } from '../helpers/action';

@Injectable({
  providedIn: 'root'
})
export class PostStateService extends Action<Post> { }
