import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  data:any = {
    id:'',
    password:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  logForm(){
    //console.log("id : "+this.data.id);
    //console.log("password : "+this.data.password);
  }
  signupBtn(){
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
