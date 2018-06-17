import { MaxLengthValidator } from "@angular/forms";
import { IIDable } from './IIDable';

export class Post implements IIDable {
    public id: string;
    public title: string;
    public shortDesc: string;
    public longDesc: string;
    public content: string;

    constructor(args: Partial<Post>) {
        Object.assign(this, args);
    }
}
