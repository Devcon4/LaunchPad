import { IActionable } from "../helpers/action";
import { Constructor } from "@angular/material/core/typings/common-behaviors/constructor";
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { BehaviorSubject, observable, Observable } from "rxjs";
import { Post } from "../models/post";

interface IDocumentable<T> {
    doc: IActionable<T>;
}

interface ICollectionable<T> {
    collection: IActionable<T[]>;
}

interface NetworkConfig<T> extends IDocumentable<T>, ICollectionable<T> {
    name: string;
}

export abstract class Network<T> implements NetworkConfig<T> {
    
    collection: IActionable<T[]>;
    doc: IActionable<T>;
    name: string;
    private _fCollection: AngularFirestoreCollection<T>;

    constructor(private config: Partial<NetworkConfig<T>> = {}, public afs: AngularFirestore) {
        Object.assign(this, config);
        
        this._fCollection = afs.collection(config.name);
        this._fCollection.valueChanges().subscribe(v => this.collection.state = v);
    }

    subCol = (obs: Observable<T[]>) => {
        obs.subscribe(v => this.collection.state = v);
        return obs;
    }

    subDoc = (obs: Observable<T>) => {
        obs.subscribe(v => this.doc.state = v);
        return obs;
    }

    // base restful implementations.

    get(id: string) {}
    getList() {}
    put(id: string, val: T) {}
    post(val: T) {}
    patch(id: string, val: T) {}
    delete(id: string) {}
}
