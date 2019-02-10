import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {

  @ViewChild(Content) content:Content;

  search_id:string="";
  rNum:number=0;
  profile:any = {};
  list:Array<object> = [];
  profileMethod='imgs';
  isFollow:boolean=false;
  isMyId:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpd:HttpClient, private serviceProvider:ServiceProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
    this.search_id=this.navParams.get("search_id");
    console.log(this.search_id);

    this.httpd.get(this.serviceProvider.data.host+'searchid.do',
    {
      params:{
        id:this.search_id,
        rNum:''+this.rNum
      }
      // header 
    }).toPromise()
    .then(data => {
      console.log(data);
      this.profile=data['data'];
      if(data['data']['boardData'].length!=0){
        this.list=data['data']['boardData'];
      }
      this.rNum=this.list.length+1;
      console.log(this.list);
    }).catch(error => {
    });
    
    // keke0123 자리에 sessionStorage 에서 받아온 id 값
    if(this.search_id != sessionStorage.getItem("id")){
      // 테스트용 session id
      this.httpd.get(this.serviceProvider.data.host+'searchisfollow.do',
      {
        params:{
          id:this.search_id,
          myId:sessionStorage.getItem("id")
        }
        // header 
      }).toPromise()
      .then(data => {
        console.log(data);
        if(data['result']=='not'){
          this.isFollow=false;
        }else if(data['result']=='followed'){
          this.isFollow=true;
        }
      }).catch(error => {
      });
    }else{
      this.isMyId=true;
    }
    
  }

  followSystem(){
    this.httpd.get(this.serviceProvider.data.host+'searchfollowsystem.do',
    {
      params:{
        id:this.search_id,
        myId:sessionStorage.getItem("id")
      }
      // header 
    }).toPromise()
    .then(data => {
      console.log(data);
      if(data['result']=='inserted'){
        this.isFollow=true;
        this.profile.count_follower=this.profile.count_follower+1;
      }else if(data['result']=='deleted'){
        this.isFollow=false;
        this.profile.count_follower=this.profile.count_follower-1;
      }
    }).catch(error => {
    });
  }

  scrollEvent(e){
  
    if(e.scrollTop==0){
      console.log("top");
    }
    
    if(this.content.scrollHeight== e.scrollTop+this.content.contentHeight){
      console.log("bottom");
      this.httpd.get(this.serviceProvider.data.host+'searchid.do',
      {
        params:{
          id:sessionStorage.getItem("id"),
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
