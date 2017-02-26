import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class SequenceData{
    sequence : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.sequence = this.db.list('/sequences');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.sequence.subscribe(data => {
                return resolve(data);
            });
        });
    }
}