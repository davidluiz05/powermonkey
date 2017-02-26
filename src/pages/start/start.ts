import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgramListPage } from '../programlist/programlist';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user';

@Component({
    selector: 'page-start',
    templateUrl: 'start.html'
})
export class StartPage{

    programlistPage = ProgramListPage;
    loginPage = LoginPage;
    
    constructor(public navCtrl: NavController){
        UserData.email = "hideo.kojima@gmail.com";
    }
}