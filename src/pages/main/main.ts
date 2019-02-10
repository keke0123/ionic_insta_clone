import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommentPage } from '../comment/comment';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild(Content) content:Content;

  // 게시물 수
  rNum:number = 1;
  list:Array<object> = [];

  isloaded:boolean=false;

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
    private httpd:HttpClient, private events:Events, 
    private serviceProvider:ServiceProvider,
    private zone:NgZone) {
    events.subscribe('tab:main', ()=>{
      console.log("main clicked");
      if(this.isloaded==false){
        return null;
      }
      this.httpd.get(this.serviceProvider.data.host+'mainPage.do',
      {
        params:{
          id:sessionStorage.getItem("id"),
          token:sessionStorage.getItem("token"),
          rNum:''+this.rNum
        }
      }).toPromise()
      .then(data => {
        if(data['data'].length!=0){
          this.list=data['data'];
        }
        this.rNum=this.list.length+1;
      })
      .catch();
    });

    events.subscribe('comment:main', (data)=>{
      console.log("comment to main");
      console.log(data);
      this.list[data.index]['count_comment']=data.count_comment;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    // provider 만들어서 method 실행시켜봄
    this.serviceProvider.myService('keke0123');
    // 테스트 아이디 세팅
    //sessionStorage.setItem('id', 'keke0123')
    // 페이지 로딩시 최초 데이타 한번 받아오기
    this.httpd.get(this.serviceProvider.data.host+'mainPage.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        token:sessionStorage.getItem("token"),
        rNum:''+this.rNum
      }
    }).toPromise()
    .then(data => {
      if(data['data'].length!=0){
        this.list=data['data'];
      }
      this.rNum=this.list.length+1;
      console.log(this.list);
      this.isloaded=true;
    })
    .catch();
  }
  
  // 스크롤 테스트
  scrollEvent(e){
    //console.log(e);
    // scroll top
    if(e.scrollTop==0){
      console.log("top");
    }
    //console.log(this.content.contentHeight);
    //console.log(this.content.scrollHeight);
    console.log(e.scrollTop);
    // scroll bottom
    if(this.content.scrollHeight== e.scrollTop+this.content.contentHeight){
      console.log("bottom");
      this.httpd.get(this.serviceProvider.data.host+'mainPage.do',
      {
        params:{
          id:sessionStorage.getItem("id"),
          token:sessionStorage.getItem("token"),
          rNum:''+this.rNum
        }
      }).toPromise()
      .then(data => {
        console.log("list:"+this.list);
        console.log("data.data:"+data['data']);
        if(data['data'].length!=0){
          this.zone.run(()=>{
            this.list=this.list.concat(data['data']);
          });
          
        }
        this.rNum=this.list.length+1;
        console.log("rNum:"+this.rNum);
        console.log(this.list);
      })
      .catch();
    }
    
  }

  // 테스트 로그인 체크
  testLoginCheck(){
    console.log("testLoginBtn");
    this.httpd.get(this.serviceProvider.data.host+'loginTest1.do',
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
    this.httpd.get(this.serviceProvider.data.host+'loginTest2.do',
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
    this.httpd.get(this.serviceProvider.data.host+'loginTest3.do',
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
  // 좋아요 버튼
  likeBtn(num, i){
    console.log("like Btn");
    console.log(num);
    // index 번호
    console.log(i);
    this.httpd.get(this.serviceProvider.data.host+'likebtn.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        board_num:''+num
      }
    }).toPromise()
    .then(data => {
      console.log(data);
      if(data['result']=='up'){
        this.list[i]['count_like']=this.list[i]['count_like']+1;
        console.log(this.list);
      }else if(data['result']=='down'){
        this.list[i]['count_like']=this.list[i]['count_like']-1;
        console.log(this.list);
      }
    })
    .catch();
  }
  //comment 버튼
  commentBtn(i){
    this.navCtrl.push(CommentPage,
      {
        board_num:this.list[i]['board_num'],
        writer:this.list[i]['writer'],
        count_comment:this.list[i]['count_comment'],
        index:i
      }
    );
  }
  
 
 
  
}
