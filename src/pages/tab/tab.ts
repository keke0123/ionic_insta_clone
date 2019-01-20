import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { UploadPage } from '../upload/upload';
import { ProfilePage } from '../profile/profile';
import { ContentPage } from '../content/content';
import { SearchPage } from '../search/search';

/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1 = MainPage;
  tab2 = UploadPage;
  tab3 = SearchPage;
  tab4 = ProfilePage;
  // tab5 = ContentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}
