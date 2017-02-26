import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class MessageBox{

    constructor(public alertCtrl: AlertController){}    

    show(title : string, content: string){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ["OK"]
        });
        alert.present();
    }
}