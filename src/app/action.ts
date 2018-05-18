import { BehaviorSubject, empty } from "rxjs";

export abstract class Action<T> {

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
