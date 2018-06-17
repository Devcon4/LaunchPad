import { IIDable } from '../models/IIDable';
import { Action, IActionable } from '../helpers/action';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { first, tap, filter, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface NetworkConfig<T extends IIDable, U> {
    doc?: IActionable<T>;
    list?: IActionable<T[]>;
    name: string;
    parent?: U;
}

export abstract class Network<T extends IIDable> {

    collection: IActionable<AngularFirestoreCollection<T>> = new Action();
    document: IActionable<AngularFirestoreDocument<T>> = new Action();
    doc: IActionable<T> = new Action();
    list: IActionable<T[]> = new Action();

    private _docSub: Subscription;

    constructor(private config: NetworkConfig<T, any>, public afs: AngularFirestore) {
        if(config.doc) {
            this.doc = config.doc;
        }

        if(config.list) {
            this.list = config.list;
        }

        if (config.parent) {
            config.parent.document.subject.pipe(filter(d => !!d)).subscribe(d => this.collection.state = d.collection(config.name));
        } else {
            this.collection.state = afs.collection(config.name);
        }

        if(!environment.production) {
            this.list.subject.pipe(tap(this.debug)).subscribe();
            this.doc.subject.pipe(tap(this.debug)).subscribe();
        }

        // list sub in function so it can be overriden ex: pagination.
        this.getList();
    }

    debug = <T>(val: T) => {
        console.groupCollapsed(`${this.config.name}: `);
        console.log(val);
        console.groupEnd();
    }

    getList() {
        this.collection.subject.pipe(filter(d => !!d)).subscribe(d => d.snapshotChanges().subscribe(v => this.list.state = v.map(i => Object.assign({}, i.payload.doc.data(), {id: i.payload.doc.id}) as T)));
    }

    getDoc(name: string, state?: IActionable<T>) {
        this.document.state = this.collection.state.doc(name);
        
        if(state) {
            this._docSub = this.document.subject.pipe(filter(d => !!d)).subscribe(d => d.snapshotChanges().subscribe(v => state.state = Object.assign({}, v.payload.data(), {id: v.payload.id}) as T));
        } else {
            if(this._docSub) {
                this._docSub.unsubscribe();
            }
            this._docSub = this.document.subject.pipe(filter(d => !!d)).subscribe(d => d.snapshotChanges().subscribe(v => this.doc.state = Object.assign({}, v.payload.data(), {id: v.payload.id}) as T));
        }
    }

    createDoc(val: T, id?: string) {
        // Maybe auto fetch data? Would have to know if I needed to update list vs doc.
        if (id) {
            this.collection.state.doc(id).set(Object.assign({}, val))
        }
        this.collection.state.add(Object.assign({}, val));
    }

    updateDoc(name: string, val: T) {
        this.collection.state.doc(name).update(Object.assign({}, val));
    }

    deleteDoc(name: string) {
        this.collection.state.doc(name).delete();
    }

    upsertDoc(name: string, val: T) {
        this.collection.state.doc(name).snapshotChanges().pipe(take(1)).subscribe(snap => {
            if(snap.payload.exists) {
                this.updateDoc(name, val);
            } else {
                this.createDoc(val, name);
            }
        });
    }
}
