import { Component } from '@angular/core';
import 
{   
    NavController
} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TestDayPage } from '../testday/testday';
import { ProgramListPage } from '../programlist/programlist';
import { FBDB } from '../../providers/fb';
import { UserData } from '../../providers/user';
import { MessageBox } from '../../providers/alert';
import { LoadingBar } from '../../providers/loading';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    signupPage = SignupPage;

    email : String = "gilhildebrand@gmail.com";
    pass : String  = "getmein";
   
    progress : any;
    
    constructor(public navCtrl: NavController, public fbDB: FBDB, public loadingBar: LoadingBar, public msgCtrl: MessageBox){
        
    }

    login(){
        this.loadingBar.show("Login...");
        
        this.fbDB.login(this.email, this.pass).then(ret => {
            if(!ret.err){
                console.log("login success");
                console.log(ret.uid);
                this.loadingBar.close();
                UserData.login(this.email, ret.uid, "");
                this.navCtrl.setRoot(ProgramListPage); //go To Home Page
            }else{
                this.loadingBar.close();
                console.log("Don't match username/password");
                this.msgCtrl.show("Failed", "Don't match");
            }
        });
    }
}