import { Component } from '@angular/core';
import 
{ 
    NavController
} from 'ionic-angular';
import { TestDayPage } from '../testday/testday';
import { ProgramListPage } from '../programlist/programlist';
import { FBDB } from '../../providers/fb';
import { MessageBox } from '../../providers/alert';
import { LoadingBar } from '../../providers/loading';
import { UserData } from '../../providers/user';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage{
    testdayPage = TestDayPage;
    
    email: String = "";
    pass: String = "";
    name: String = "";

    progress : any;

    constructor(public navCtrl: NavController, public fbDB: FBDB, public msgBox: MessageBox, public loadingBar: LoadingBar){
        
    }

    signup(){
        this.loadingBar.show("Register...");

        this.fbDB.signup(this.email, this.pass, this.name).then(ret => {
            if(ret){
                console.log("Sign up is success");
                console.log(ret);
                UserData.login(this.email, ret, this.name);
                this.loadingBar.close();
                if(UserData.isEmptyCurrentProgramId()){
                    this.navCtrl.push(ProgramListPage);
                }else{
                    this.navCtrl.push(TestDayPage);
                }                
            }else{
                console.log("Sign up Error");
                this.loadingBar.close();
                this.msgBox.show("Failed", "Signup Error");
            }
        });
    }
}