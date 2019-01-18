import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  loginForm: FormGroup;
  triedToSubmitLogin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder, private alertCtrl: AlertController,
    private httpd:HttpClient) {
    this.loginForm = this.formBuilder.group({
      userId:['', [Validators.required, Validators.minLength(2)]],
      userPassword:['', [Validators.required, Validators.pattern('(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[0-9]).{6,}')]]
    });
  }

  errorMessages = {
    userId: {
      required: 'id 를 입력해주세요',
      minlength: '최소 4글자 이상 입력해주세요'
    },
    userPassword:{
      required: 'Password 를 입력해주세요',
      pattern: '특수문자, 영소문자, 숫자를 하나 이상씩 6글자 이상 입력해주세요'
    }
  }

  errorData:any = {
    userId:'id 를 입력해주세요',
    userPassword:'Password 를 입력해주세요'
  }

  submitLogin(){
    this.triedToSubmitLogin = true;
    if(this.loginForm.invalid){
      for(var control in this.loginForm.controls){
        this.loginForm.controls[control].markAsDirty();
        this.loginForm.controls[control].markAsTouched();
      }
      return null;
    }
    this.httpd.post('http://192.168.0.3:8888/project/login.do',
    {
      id:this.data.id,
      password:this.data.password,
    },{}).toPromise()
    .then(data => {
      console.log(data);
      if(data['result']=='success'){
        this.navCtrl.setRoot(MainPage);
        sessionStorage.setItem("id", this.data.id);
        sessionStorage.setItem("token", data['token']);
      }
    })
    .catch();

  }

  // blur 이벤트로 error 체크
  errorFor(field, id){
    var control=this.loginForm.controls[field];
    for(var validator in control.errors){
      if(control.errors[validator]){
        console.log(validator);
        // errorData 란 오브젝트에 넣어서 {{ 돌려주는 법 }}
        this.errorData[field]=this.errorMessages[field][validator];
      }
    }
  }

  findPassword(){
    let alert = this.alertCtrl.create({
      title: '비밀번호 찾기',
      message: '가입한 메일 주소를 입력해주세요.',
      inputs: [
        {
          name: 'email',
          placeholder: 'email 을 입력해 주세요'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'send',
          handler: (data) => {
            console.log('send clicked');
            this.httpd.get('http://192.168.0.3:8888/project/findpassword.do',
            {
              params:{
                email:data.email
              }
            }).toPromise()
            .then(data => {
              console.log(data);
            })
            .catch();
          }
        }
      ]
    });

    alert.present();
  }
  // custom token 생성메소드
  generateToken(n){
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  //test login 기능
  testBtn(){
    this.navCtrl.setRoot(MainPage);
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
