import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AssessmentData{
    assessments : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.assessments = this.db.list('/assessments');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.assessments.subscribe(data => {
                return resolve(data);
            });
        });
    }
}