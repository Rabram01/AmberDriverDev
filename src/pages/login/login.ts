import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { RegisterPage } from './../register/register';
import { Driver } from './../../models/driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  driver = {} as Driver;

  constructor(private aFauth : AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(driver: Driver){
    try{
   const res = await this.aFauth.auth.signInWithEmailAndPassword(driver.email, driver.password);
   //console.log(res);
   if(res){
     this.navCtrl.setRoot('HomePage');
   }
    } catch(e){
      console.error(e);
    }

  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
