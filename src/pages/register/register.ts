import { Driver } from './../../models/driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//FireBase !!!Mieux en abstract service!!!
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  driver = {} as Driver;

  constructor(private aFauth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(driver: Driver) {
    try {
      const res = await this.aFauth.auth.createUserWithEmailAndPassword(driver.email, driver.password);
      if(res){
        this.aFauth.authState.subscribe(data => {
          this.afDatabase.object(`profile/${data.uid}`).set(this.driver)
          .then(() => this.navCtrl.setRoot('HomePage'));
        })
      }
    } catch (e) {
      console.error('error create' + e);
    }
  }

}
