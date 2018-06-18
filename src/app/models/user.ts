import { IIDable } from './IIDable';

export class User implements IIDable {
    id: string;
    email: string;
    photoURL?: string;
    displayName?: string;

    constructor(args: Partial<User>) {
        Object.assign(this, args);
    }
}