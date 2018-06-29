import { IIDable } from './IIDable';
import { Type } from '@angular/core';
import { CreatePostModalComponent } from '../components/modals/create-post-modal/create-post-modal.component';

export class textCompClass {}
export class headerCompClass {
    constructor() {}
}

export class ContentType {}


export interface IDynamicable<T> {
    component: T[keyof T];
}
  

export type ContentGrid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export class Content implements IIDable{
    public id: string = '';
    public type: string;
    public width: ContentGrid = 12;
    public text?: string = '';

    constructor(args: Partial<Content>) {
        Object.assign(this, args);
    }

    public getComponent(key: keyof ContentType) {
        return ContentType[key];
    }
}