import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class ExerciseData{
    exercises : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.exercises = this.db.list('/exercises');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.exercises.subscribe(data => {
                return resolve(data);
            });
        });
    }
}