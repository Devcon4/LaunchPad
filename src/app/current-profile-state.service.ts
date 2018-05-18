import { Injectable } from '@angular/core';
import { Action } from './action';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class CurrentProfileStateService extends Action<Profile> {}
