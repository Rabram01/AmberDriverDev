import { HomePage } from './../home/home';
import { Driver } from './../../models/driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  driver = {} as Driver;

  constructor(private aFauth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile() {
    this.aFauth.authState.subscribe(data => {
      this.afDatabase.object(`profile/${data.uid}`).set(this.driver)
      .then(() => this.navCtrl.push('HomePage'));
    })
  }


}
