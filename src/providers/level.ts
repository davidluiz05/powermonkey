import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class LevelData{
    level : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.level = this.db.list('/levels');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.level.subscribe(data => {
                return resolve(data);
            });
        });
    }
}