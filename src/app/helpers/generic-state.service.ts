import { Injectable } from '@angular/core';
import { Action } from '../helpers/action';

@Injectable({
  providedIn: 'root'
})
export class GenericStateService<T> extends Action<T> {}
