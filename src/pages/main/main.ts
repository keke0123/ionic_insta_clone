import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  httpOptions = {
    headers: new HttpHeaders({
      // charset까지 적어주면 json.stringify 해도 들어간다.
      //'Content-Type':  'application/json; charset=utf-8',
      //'Authorization': 'my-auth-token'
    }),
    params:{
    }
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpd:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  // 테스트 로그인 체크
  testLoginCheck(){
    console.log("testLoginBtn");
    this.httpd.get('http://192.168.0.3:8888/project/loginTest1.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        token:sessionStorage.getItem("token")
      }
    }).toPromise()
    .then(data => {
      console.log(data);
    })
    .catch();
  }

  sessionTest1(){
    sessionStorage.setItem("id","keke0123");
    this.httpd.get('http://192.168.0.3:8888/project/loginTest2.do',
    {
      withCredentials : true,
      params:{
        id:sessionStorage.getItem("id"),
      }
    }).toPromise()
    .then(data => {
      console.log(data);
    })
    .catch();
  }
  sessionTest2(){
    sessionStorage.setItem("id","keke0123");
    this.httpd.get('http://192.168.0.3:8888/project/loginTest3.do',
    {
      withCredentials : true,
      params:{
        id:sessionStorage.getItem("id"),
      }
    }).toPromise()
    .then(data => {
      console.log(data);
    })
    .catch();
  }

}
