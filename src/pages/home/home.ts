import { Component } from '@angular/core';
import {  NavController, ModalController } from 'ionic-angular';
import { WorkoutHistoryPage } from '../workouthistory/workouthistory';
import { SettingsModalPage } from '../settingsmodal/settingsmodal';
import { WorkoutPage } from '../workout/workout';
import { WorkoutDetailPage } from '../workoutdetail/workoutdetail';
import { UserData } from '../../providers/user';
import { FBDB } from '../../providers/fb';
import { LoadingBar } from '../../providers/loading';
import { MessageBox } from '../../providers/alert';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    workoutHistoryPage = WorkoutHistoryPage;
    workoutPage = WorkoutPage;
    program : any = null;
    level = UserData.getLevel();
    workouts : Array<Object> = [];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fbDB: FBDB, public loadingBar: LoadingBar, public msgBox: MessageBox){
        this.loadingBar.show("please wait...");
        this.fbDB.getProgram().then(program => {
            console.log(program);
            this.program = program;

            this.fbDB.getWorkouts().then(workouts => {
                this.workouts = workouts;
                console.log(this.workouts);
                this.loadingBar.close();
            });
        });
    }

    showModal(){
        let modal = this.modalCtrl.create(SettingsModalPage);
        modal.present();
    }

    goToWorkoutDetailPage(key, title){
        this.navCtrl.push(WorkoutDetailPage, { id: key, title: title });
    }
}