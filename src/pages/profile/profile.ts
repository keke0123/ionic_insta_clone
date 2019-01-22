import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(Content) content:Content;

  profileMethod:string = 'imgs';

  // 하단 이미지 관련
  profile:any = {};
  rNum:number = 0;
  list:Array<object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpd:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.httpd.get('http://192.168.0.3:8888/project/profile.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        token:sessionStorage.getItem("token"),
        rNum:'1'
      }
    }).toPromise()
    .then(data => {
      console.log(data);
      this.profile=data['data'];
      if(data['data']['boardData'].length!=0){
        this.list=data['data']['boardData'];
      }
      this.rNum=this.list.length+1;
      console.log(this.list);
    })
    .catch();
  }

  scrollEvent(e){
  
    if(e.scrollTop==0){
      console.log("top");
    }
    
    if(this.content.scrollHeight== e.scrollTop+this.content.contentHeight){
      console.log("bottom");
      this.httpd.get('http://192.168.0.3:8888/project/profile.do',
      {
        params:{
          id:sessionStorage.getItem("id"),
          token:sessionStorage.getItem("token"),
          rNum:''+this.rNum
        }
      }).toPromise()
      .then(data => {
        //console.log(data);
        if(data['data']['boardData'].length!=0){
          this.list.concat(data['data']['boardData']);
        }
        this.rNum=this.list.length+1;
        console.log(this.list);
      })
      .catch();
    }
    
  }

}
