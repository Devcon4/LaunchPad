import { BehaviorSubject, empty } from "rxjs";
import { state } from "@angular/animations";

export interface IActionable<T> {
    state: T;
    subject: BehaviorSubject<T>;
}

export class Action<T> implements Action<T> {

    private _subject: BehaviorSubject<T> = new BehaviorSubject(undefined);

    get state() {
        return this._subject.getValue();
    }

    set state(val: T) {
        this._subject.next(val);
    }
    
    get subject() {
        return this._subject;
    }
}
