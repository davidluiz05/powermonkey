import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StartPage } from '../pages/start/start';
import { ProgramListPage } from '../pages/programlist/programlist';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TestDayPage } from '../pages/testday/testday';
import { SelectLevelPage } from '../pages/assessment/selectlevel/selectlevel';
import { SetWorkoutDayPage } from '../pages/assessment/setworkoutday/setworkoutday';
import { SchedulePage } from '../pages/schedule/schedule';
import { HomePage } from '../pages/home/home';
import { WorkoutHistoryPage } from '../pages/workouthistory/workouthistory';
import { ProgressPage } from '../pages/progress/progress';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsModalPage } from '../pages/settingsmodal/settingsmodal';
import { WorkoutPage } from '../pages/workout/workout';
import { WorkoutDetailPage } from '../pages/workoutdetail/workoutdetail';

import { AngularFireModule } from 'angularfire2';
import { FBDB } from '../providers/fb';
import { MessageBox } from '../providers/alert';
import { LoadingBar } from '../providers/loading';

var config = {
    apiKey: "AIzaSyCex6N-fQmLcuBFmQDwnP5cjVHaLS1uOqM",
    authDomain: "mm-coach-app.firebaseapp.com",
    databaseURL: "https://mm-coach-app.firebaseio.com",
    storageBucket: "mm-coach-app.appspot.com",
    messagingSenderId: "33997364977"
  };

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    StartPage,
    ProgramListPage,
    LoginPage,
    SignupPage,
    TestDayPage,
    SelectLevelPage,
    SetWorkoutDayPage,
    SchedulePage,
    HomePage,
    WorkoutHistoryPage,
    ProgressPage,
    SettingsPage,
    SettingsModalPage,
    WorkoutPage,
    WorkoutDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText:'',
      iconMode: 'ios',
      pageTransition:'ios'
    }, {}),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    StartPage,
    ProgramListPage,
    LoginPage,
    SignupPage,
    TestDayPage,
    SelectLevelPage,
    SetWorkoutDayPage,
    SchedulePage,
    HomePage,
    WorkoutHistoryPage,
    ProgressPage,
    SettingsPage,
    SettingsModalPage,
    WorkoutPage,
    WorkoutDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FBDB,
    MessageBox,
    LoadingBar
    ]
})
export class AppModule {}
