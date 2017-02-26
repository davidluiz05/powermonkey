import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class ProgramData{
    program : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.program = this.db.list('/program');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.program.subscribe(data => {
                return resolve(data);
            });
        });
    }
}