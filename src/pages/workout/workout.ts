import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgramListPage } from '../programlist/programlist';

@Component({
    selector: 'page-workout',
    templateUrl: 'workout.html'
})
export class WorkoutPage {
    programlistPage = ProgramListPage;
    
    constructor(public navCtrl: NavController){

    }
}