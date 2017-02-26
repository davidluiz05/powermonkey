import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user';
import { FBDB } from '../../providers/fb';
import { LoadingBar } from '../../providers/loading';
import { MessageBox } from '../../providers/alert';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html'
})
export class SchedulePage {

    tabsPage = TabsPage;
    days: any = ["monday", "monday", "monday"];
    reminder : boolean = false;

    constructor(public navCtrl: NavController, public fbDB: FBDB, public loadingBar: LoadingBar, public msgBox: MessageBox){
        this.loadingBar.show("Please wait...");
        this.fbDB.getDaysByProgram().then(days => {
            this.loadingBar.close();
            console.log(days);
            if(days.length >= 3){
                this.days[0] = days[0].$value;
                this.days[1] = days[1].$value;
                this.days[2] = days[2].$value;
            }
        });
    }

    onNext(){
        
        this.loadingBar.show("Save...");        
        this.fbDB.setDaysInfo(this.days[0], this.days[1], this.days[2], this.reminder).then(status => {
            this.loadingBar.close();
            if(status){
                this.navCtrl.push(TabsPage);
            }else{
                this.msgBox.show("Failed", "Error");
            }
        });
    }
}