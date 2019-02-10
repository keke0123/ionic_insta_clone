import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment_list:Array<any>=[];
  board_num:string;
  comment:string='';
  target:string;
  writer:string;
  comment_group_num:number=0;
  count_comment:number=0;
  index:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpd:HttpClient, private events:Events,
    private serviceProvider:ServiceProvider) {
    this.board_num=this.navParams.get("board_num");
    this.writer=this.navParams.get("writer");
    this.count_comment=this.navParams.get('count_comment');
    this.index=this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    console.log("comment board_num : "+this.board_num);
    
    // 원래 id 는 session 에 담긴 id 값
    this.httpd.get(this.serviceProvider.data.host+'getcomment.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        board_num:this.board_num
      }
    }).toPromise()
    .then(data => {
      //console.log(data);
      this.comment_list=data['data'];
      console.log(this.comment_list);
    })
    .catch();

  }

  ionViewWillLeave(){
    console.log("bye");
    //console.log("count_comment : "+this.count_comment);
    this.events.publish('comment:main', {
      count_comment:this.count_comment,
      index:this.index
    });
  }

   // 댓글 전송 / x=target id, y=comment_group_num
  sendComment(){
    this.target=this.writer;
    console.log(this.writer);
    this.comment_group_num=0; 
    this.httpd.get(this.serviceProvider.data.host+'setcomment.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        //comment_group_num:''+this.comment_group_num,
        board_num:this.board_num,
        comment_content:this.comment,
        target:this.target
      }
    }).toPromise()
    .then(data => {
      console.log(data);
      if(data['result']=='success'){
        this.count_comment=this.count_comment+1;
        
        this.comment_list.push({
          comment_writer:sessionStorage.getItem("id"),
          comment_content:this.comment,
          target:this.target
        });
      }
    })
    .catch();
  }


}
