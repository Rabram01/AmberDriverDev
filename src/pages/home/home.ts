
import { Driver } from './../../models/driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

//Geolocation
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { TrackingProvider } from './../../providers/tracking/tracking';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  geoPosition: Geoposition;
  geolocOption: GeolocationOptions;
  public lat: number = 0;
  public lng: number = 0;

  profileDriveData: FirebaseObjectObservable<Driver>;
  driver = {} as Driver;


  constructor(private geoNative: Geolocation, private platform: Platform, public tracking : TrackingProvider,
    private aFauth: AngularFireAuth, private toast: ToastController, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.aFauth.authState.subscribe(data => {
      this.toast.create({
        message: `Wellcome to APP_NAME, ${data.email}`,
        duration: 3000
      }).present();
      console.log(data);


      this.profileDriveData = this.afDatabase.object(`profile/${data.uid}`);
      console.log(this.profileDriveData);
    })
  }
  
    async getGeolocation() {
      await this.platform.ready();
      try {
        this.geolocOption = {
          timeout: 1000,
          enableHighAccuracy: true
        }
        //this.geoPosition = await this.geoNative.getCurrentPosition(this.geolocOption);
        this.geoNative.watchPosition(this.geolocOption)
          .subscribe(pos => {
            this.geoPosition = pos;
            this.aFauth.authState.subscribe(data => {
              this.driver.lat = this.geoPosition.coords.latitude;
              this.driver.long = this.geoPosition.coords.longitude;
              this.afDatabase.list(`profile/${data.uid}`).push(this.driver);
            })
            
          })
  
      } catch (e) {
        console.error(e);
      }
    }
  
  start(){
    this.tracking.startTracking();
  }
  
  stop(){
    this.tracking.stopTracking();
  }

}
