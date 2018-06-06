import { MaxLengthValidator } from "@angular/forms";

export class Post {
    public title: string;
    public shortDesc: string;
    public longDesc: string;
    public content: string;

    constructor(args: Partial<Post>) {
        Object.assign(this, args);
    }
}
