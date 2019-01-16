import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    private formBuilder:FormBuilder) {
    this.loginForm = formBuilder.group({
      userId:['', [Validators.required, Validators.minLength(2)]],
      userPassword:['', [Validators.required, Validators.pattern('(?=.+[#?!@$%^&*-])(?=.+[a-z])(?=.+[0-9]).{6,}')]]
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
    }
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
