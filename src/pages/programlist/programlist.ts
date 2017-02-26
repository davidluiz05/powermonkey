import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FBDB } from '../../providers/fb';
import { LoadingBar } from '../../providers/loading';
import { UserData } from '../../providers/user';
import { SignupPage } from '../signup/signup';
import { TestDayPage } from '../testday/testday';
import { YoutubeVideoPlayer  } from 'ionic-native';

@Component({
    selector: 'page-programlist',
    templateUrl: 'programlist.html'
})
export class ProgramListPage{
    programs : any;

    constructor(public navCtrl: NavController, public fbDB: FBDB, public loadingBar: LoadingBar){

        this.loadingBar.show("Please wait...");

        this.fbDB.getAllPrograms().then(programs => {
            this.programs = programs;
            this.loadingBar.close();
        });
        
    }

    onStart(pid){
        UserData.setCurrentProgramId(pid);
        
        if(UserData.isLogged()){
            this.navCtrl.push(TestDayPage);
        }else{
            this.navCtrl.push(SignupPage);
        }
    }

    onPlay(){
        YoutubeVideoPlayer.openVideo("hoJgpF2iHsY");
    }
}