import { Action } from './action';

export class NetworkAction<T> {
    doc = new Action<T>();
    list = new Action<T[]>();
}