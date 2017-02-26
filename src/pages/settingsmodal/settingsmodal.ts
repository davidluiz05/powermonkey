import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-settingsmodal',
    templateUrl: 'settingsmodal.html'
})
export class SettingsModalPage {
    constructor(public viewCtrl: ViewController){
        
    }

    cancel(){
        this.viewCtrl.dismiss();
    }

    save(){
        this.viewCtrl.dismiss();
    }
}