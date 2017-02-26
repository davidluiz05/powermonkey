import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SchedulePage } from '../../schedule/schedule';
import { UserData } from '../../../providers/user';
import { FBDB } from '../../../providers/fb';
import { LoadingBar } from '../../../providers/loading';

@Component({
    selector: 'page-setworkoutday',
    templateUrl: 'setworkoutday.html'
})

export class SetWorkoutDayPage{
    schedulePage = SchedulePage;
    level  = UserData.getLevel();
    

    constructor(public navCtrl: NavController){        
    }
}