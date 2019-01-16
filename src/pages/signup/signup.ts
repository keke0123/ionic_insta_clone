import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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

  errorData:any = {
    userId:'id 를 입력해주세요',
    userPassword:'Password 를 입력해주세요',
    userEmail:'Email 을 입력해주세요'
  }
  
  // signupForm: FormGroup; // 이거 붙여줘야 되는거 같은데?
  signupForm: FormGroup;
  triedToSubmit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder, private http:HTTP,
    private httpd: HttpClient) {
    this.signupForm = formBuilder.group({
      userId:['', [Validators.required, Validators.minLength(2)]],
      userPassword:['', [Validators.required, Validators.pattern('(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[0-9]).{6,}')]],
      userEmail:['', [Validators.required, Validators.email]]
    });
 
  }

  submitSignup(){
    this.triedToSubmit = true;
    if(this.signupForm.invalid){
      for(var control in this.signupForm.controls){
        this.signupForm.controls[control].markAsDirty();
        this.signupForm.controls[control].markAsTouched();
      }
      return null;
    }
    console.log("submitSignup");
    // 아래는 cordova 로 실행하기 때문에 pc 로는 test 가 불가능하다
    // 그래서 angular 의 http 를 사용해 다시 만들기로 함
    // this.http.post('http://192.168.0.3:8888/project/signup.do',{
    //   // data
    //   'id':this.data.id,
    //   'password':this.data.password,
    //   'email':this.data.email
    // },{
    //   // header
      
    // }).then(data => {
    //   console.log(data.data);
    // }).catch(error => {
    //   //this.testString=error.error;
    // });

    const httpOptions = {
      headers: new HttpHeaders({
        // charset까지 적어주면 json.stringify 해도 들어간다.
        //'Content-Type':  'application/json; charset=utf-8',
        //'Authorization': 'my-auth-token'
      }),
      params:{
        // 파라미터로 보내면 잘 간다.
        //id:this.data.id,
        //password:this.data.password,
        //email:this.data.email  
      }
    };
    //console.log("id : "+this.data.id);
    // 이렇게 body 에 보낼때는 받을때 @requestbody 로 받아야 된다.
    this.httpd.post('http://192.168.0.3:8888/project/signup.do',
    {
      // JSON.stringfy 쓰고 싶으면 header 에 content-type에 charset까지 명시
      id:this.data.id,
      password:this.data.password,
      email:this.data.email

    },httpOptions).toPromise()
    .then(data => {
      console.log(data);
    })
    .catch();
    
  }

  errorMessages = {
    userId: {
      required: 'id 를 입력해주세요',
      minlength: '최소 4글자 이상 입력해주세요'
    },
    userEmail:{
      required:'Email 을 입력해주세요',
      email: '불가능한 Email 주소 입니다'
    },
    userPassword:{
      required: 'Password 를 입력해주세요',
      pattern: '특수문자, 영소문자, 숫자를 하나 이상씩 6글자 이상 입력해주세요'
    }
  }
  // blur 이벤트로 error 체크
  errorFor(field, id){
    var control=this.signupForm.controls[field];
    for(var validator in control.errors){
      if(control.errors[validator]){
        console.log(validator);
        // #errorId 라는 id 값을 받아와서 넣는 방법
        id.innerText=this.errorMessages[field][validator];
        // errorData 란 오브젝트에 넣어서 {{ 돌려주는 법 }}
        this.errorData[field]=this.errorMessages[field][validator];
      }
    }
  }

  signSub(){
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

}
