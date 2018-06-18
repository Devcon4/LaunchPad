import { BehaviorSubject, empty } from "rxjs";
import { state } from "@angular/animations";

export class Action<T> {

    private _subject: BehaviorSubject<T> = new BehaviorSubject<T>(undefined);

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
