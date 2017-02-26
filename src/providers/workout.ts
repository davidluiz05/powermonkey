import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class WorkoutData{
    workout : FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){
        this.workout = this.db.list('/workouts');
    }
    
    getAllAssessments(){
        return new Promise(resolve => {
            this.workout.subscribe(data => {
                return resolve(data);
            });
        });
    }
}