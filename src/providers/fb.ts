import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase,AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { UserData } from './user';

@Injectable()
export class FBDB{
    program: FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public af: AngularFire){}
    
    getAllPrograms(){
        return new Promise(resolve => {
            this.db.list('/programs').subscribe(data => {
                return resolve(data);
            });
        });
    }

    getAssessments(programid): Promise <Array<any>>{
        return new Promise(resolve => {
            this.db.list('/assessments/' + programid).subscribe(assessments => {
                console.log(assessments);
                return resolve(assessments);
            })
        });
    }

    saveUserState(level): Promise<{err: any}>{
        return new Promise(resolve => {
            this.db.object('/userStatus/' + UserData.getUserId() ).set({
                levelId: level,
                programId: UserData.getCurrentProgramId()
            }).then(data => {
                return resolve({err: null});
            }).catch(err => {
                console.log(err);
                return resolve({err: err});
            });
        });
    }

    getDaysByProgram() : Promise<Array<any>>{
        return new Promise(resolve => {
            this.db.list('/programs/' + UserData.getCurrentProgramId() + '/daysPerWeek').subscribe(days => {
                return resolve(days);
            }, err => {
                return resolve([]);
            });
        });
    }

    
    getExerciseInfo(eid) : Promise<{ title ?: String, video ?: String}>{
        return new Promise(resolve => {
            this.db.object('/exercises/' + eid).subscribe(ret => {
                return resolve(ret);
            }, err => {
                return resolve(null);
            });
        });
    }


    getProgram() : Promise<Object> {
        return new Promise(resolve => {
            this.db.object('/programs/' + UserData.getCurrentProgramId()).subscribe(program => {
                return resolve(program);
            }, err => {
                return resolve(null);
            });
        });
    }

    getWorkouts() : Promise<Array<Object>> {
        return new Promise(resolve => {
            this.db.list('/workouts/' + UserData.getCurrentProgramId() + '/' + UserData.getLevel()).subscribe(workouts => {
                return resolve(workouts);
            }, err => {
                return resolve(null);
            });
        });
    }

    getSequences(workoutid): Promise<Array<Object>> {
        return new Promise(resolve => {
            this.db.list('/workouts/' +UserData.getCurrentProgramId() + '/' + UserData.getLevel() + '/' + workoutid + '/sequences').subscribe(sequences => {
                var ret = sequences.map(sequence => {
                    this.db.object('/sequences/' + sequence.$key).subscribe(data => {
                        sequence.sequencedata = data;
                        
                        let exercises = [];
                        for(var key in sequence.sequencedata.exercises){
                            exercises.push({
                                $key:key
                            });
                        }
                        sequence.exerciseids = exercises;
                        sequence.exercisedata = sequence.exerciseids.map(exercisedata => {
                            this.db.object('/sequenceExercises/' + exercisedata.$key).subscribe(ex => {
                                exercisedata.einfo = ex;
                            });
                            return exercisedata;
                        });
                    });
                    return sequence;
                });
                console.log(ret);
                return resolve(ret);
            }, err => {
                return resolve(null);
            });
        });
    }

    setDaysInfo(v1, v2, v3, reminder){
        return new Promise(resolve => {
            this.db.object('/userStatus/' + UserData.getUserId()).set({
                levelId : UserData.getLevel(),
                programId: UserData.getCurrentProgramId(),
                reminder: reminder,
                dayPerWeek: {
                    0: v1,
                    1: v2,
                    2: v3
                }
            }).then(data => {
                return resolve(true);
            }).catch(err => {
                return resolve(false);
            });
        })
    }

    login(email, pass) : Promise< {uid : String, err: String }>{
        return new Promise(resolve => {
            this.db.list('/users', {
                query: {
                    orderByChild: 'email',
                    equalTo: email
                }
            }).subscribe( data => {
                console.log(data);
                if(data.length > 0){
                    var user = data[0];
                    if(user.password == pass){
                        console.log(data);
                        return resolve({uid: data[0].$key, err: null});
                    }else{
                        return resolve({err: true, uid: null});
                    }
                }else{
                    return resolve({err: true, uid: null});
                }                
            }, err => {
                return resolve({err: err});
            });
        });            
    }
    
    signup(email, pass, name){
        return new Promise(resolve => {
            this.db.list('/users').push({
                displayName: name,
                email: email,
                password: pass
            }).then(data => {
                console.log(data.key);
                return resolve(data.key);
            }).catch(err => {
                console.log(err);
                return resolve(null);
            });
        })
    }


}