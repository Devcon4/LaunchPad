import { IIDable } from './IIDable';
import { Post } from './post';

export class Profile implements IIDable {
    public id: string;
    public role: string = '';
    public displayName: string = '';
    public companyName: string = '';
    public bio: string = '';
    
    constructor(args: Partial<Profile>) {
        Object.assign(this, args);
    }
}
