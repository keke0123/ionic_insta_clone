import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  data:any = {
    id:'',
    password:'',
    email:''
  }
  // myForm: FormGroup; // 이거 붙여줘야 되는거 같은데?
  myForm: FormGroup;
  triedToSubmit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder) {
    this.myForm = formBuilder.group({
      userId:['', [Validators.required, Validators.minLength(2)]],
      userPassword:['', [Validators.required, Validators.pattern('(?=.+[#?!@$%^&*-])(?=.+[a-z])(?=.+[0-9]).{6,}')]],
      userEmail:['', [Validators.required, Validators.email]]
    });
  }

  submit(){
    this.triedToSubmit = true;
    if(this.myForm.invalid){
      for(var control in this.myForm.controls){
        this.myForm.controls[control].markAsDirty();
        this.myForm.controls[control].markAsTouched();
      }
    }
  }
  errorMessages = {
    userId: {
      required: 'id 를 입력해주세요',
      minlength: '최소 4글자 이상 입력해주세요'
    },
    userEmail:{
      required:'Email 을 입력해주세요',
      eamil: '불가능한 Email 주소 입니다'
    },
    userPassword:{
      required: 'Password 를 입력해주세요',
      pattern: '특수문자, 영소문자, 숫자를 하나 이상씩 6글자 이상 입력해주세요'
    }
  }
  errorFor(field){
    var control=this.myForm.controls[field];
    for(var validator in control.errors){
      if(control.errors[validator]){
        return this.errorMessages[field][validator];
      }
    }
    return null;
  }

  signupForm(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
