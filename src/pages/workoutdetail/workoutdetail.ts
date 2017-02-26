import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { FBDB } from '../../providers/fb';
import { LoadingBar } from '../../providers/loading';
import { MessageBox } from '../../providers/alert';
import { YoutubeVideoPlayer  } from 'ionic-native';

@Component({
    selector: 'page-workoutdetail',
    templateUrl: 'workoutdetail.html'
})
export class WorkoutDetailPage{
    sequences : any = null;
    title: String = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public fbDB: FBDB, public loadingBar: LoadingBar, public msgBox: MessageBox){
        this.loadingBar.show("please wait...");
        console.log(this.navParams.get('id'));
        this.title = this.navParams.get('title');
        this.fbDB.getSequences(this.navParams.get('id')).then(sequences => {
            this.loadingBar.close();
            this.sequences = sequences;
        });
    }

    playVideo(eid){
        this.loadingBar.show("please wait...");
        this.fbDB.getExerciseInfo(eid).then(exercise => {
            this.loadingBar.close();

            let arr = exercise.video.split("v=");
            YoutubeVideoPlayer.openVideo(arr[1]);

        });
    }
}