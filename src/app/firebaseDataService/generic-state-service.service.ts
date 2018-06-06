import { Injectable } from '@angular/core';
import { Action } from '../helpers/action';

@Injectable({
  providedIn: 'root'
})
export class GenericStateServiceService<T> extends Action<T> {}
