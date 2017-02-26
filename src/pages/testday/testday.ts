import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectLevelPage } from '../assessment/selectlevel/selectlevel';

@Component({
    selector: 'page-testday',
    templateUrl: 'testday.html'
})
export class TestDayPage {
    selectlevelPage = SelectLevelPage;
    
    constructor(public navCtrl: NavController){
        
    }
}