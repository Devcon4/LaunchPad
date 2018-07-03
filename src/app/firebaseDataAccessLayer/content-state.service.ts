import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { Action } from '../helpers/action';
import { NetworkAction } from '../helpers/networkAction';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService extends NetworkAction<Content> { }
