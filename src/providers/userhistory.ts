import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class UserHistoryData{
    history : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.history = this.db.list('/userHistory');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.history.subscribe(data => {
                return resolve(data);
            });
        });
    }
}