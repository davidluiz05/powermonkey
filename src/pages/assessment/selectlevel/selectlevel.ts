import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetWorkoutDayPage } from '../setworkoutday/setworkoutday';
import { FBDB } from '../../../providers/fb';
import { UserData } from '../../../providers/user';
import { LoadingBar } from '../../../providers/loading';
import { MessageBox } from '../../../providers/alert';
import { YoutubeVideoPlayer  } from 'ionic-native';

@Component({
    selector: 'page-selectlevel',
    templateUrl: 'selectlevel.html'
})
export class SelectLevelPage{
    assessments : any;
    step : number;
    maxstep: number;
    level: number;
    value: number;
    gLevel: number;
    exerciseInfo : Object = {title: "", video: ""};
    mobilityLevel: number = -1;
    isMobility: boolean = false;    
    
    constructor(public navCtrl: NavController, public fbDB: FBDB, public loadingBar: LoadingBar, public msgBox: MessageBox){
        
        this.step = 0;
        this.assessments = null;
        this.maxstep = 0;
        this.level = 1;

        this.loadingBar.show('Please wait...');
                
        this.fbDB.getAssessments(UserData.getCurrentProgramId()).then(assessments => {
            console.log(assessments);            
            this.assessments = assessments;
            this.maxstep = assessments.length;
            console.log(this.assessments);

            //get exercise info
            this.fbDB.getExerciseInfo(this.assessments[this.step].exerciseId).then(ret=>{
                this.exerciseInfo = ret;
                //set mobility in view
                this.isMobility = this.assessments[this.step].isMobility;
                this.loadingBar.close();
            });
        });
        
    }

    onNext(){ 
        if(this.isMobility && this.mobilityLevel == -1){
            this.msgBox.show("Alert", "please select an image");
        }else if(!this.value && this.isMobility == false){
            this.msgBox.show("Alert", "Plase input numbers");
        }else{
            if(this.assessments[this.step].levels && !this.assessments[this.step].isMobility){
                for(var i = 1; i < this.assessments[this.step].levels.length; i++){
                    if(this.assessments[this.step].levels[i].min <= this.value){
                        this.level = i;
                    }else{                  
                        if(!this.gLevel || this.level < this.gLevel){
                            this.gLevel = this.level;
                        }
                        break;
                    }
                }
            }
            console.log("step = " + this.step + ", value = " + this.value + ", level = "+ this.level);
            //go to next exercise
            if((this.step + 1) >= this.maxstep){
                console.log(this.gLevel);

                this.fbDB.saveUserState(this.gLevel).then(ret => {
                    if(!ret.err){
                        UserData.setLevel(this.gLevel);
                        this.navCtrl.push(SetWorkoutDayPage);
                    }else{
                        this.msgBox.show("Failed", "Error");
                    }
                });
            }else{
                this.loadingBar.show("please wait...");
                this.step = this.step + 1;
                this.value = null;
                this.level = 1;
                this.isMobility = this.assessments[this.step].isMobility;

                this.fbDB.getExerciseInfo(this.assessments[this.step].exerciseId).then(ret=>{
                    this.exerciseInfo = ret;
                    this.loadingBar.close();
                });
            }            
        }
    }    

    onPlay(url : String){
        let arr = url.split("/");
        YoutubeVideoPlayer.openVideo(arr[3]);
    }    
    
}