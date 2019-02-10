import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { isUndefined, isBoolean } from 'ionic-angular/umd/util/util';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  // input 으로 받은 내용 양방향 저장
  data:any = {
    id:'',
    password:'',
    email:''
  }

  // 폼 체크후 에러시 에러 데이타에 있는 문자열이 출력된다.
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
    private httpd: HttpClient, private serviceProvider:ServiceProvider) {
    this.signupForm = formBuilder.group({
      // canUseId 는 사용자 정의 validator
      userId:['', [Validators.required, Validators.minLength(4)]],
      userPassword:['', [Validators.required, Validators.pattern('(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[0-9]).{6,}')]],
      userEmail:['', [Validators.required, Validators.email]]
    });
    
  }
  
  // 
  idUsed:boolean=false;
  // 아이디 중복 확인할 함수 / input id blur 일때 이벤트
  checkId(errorId){
    this.idUsed=false;
    console.log("checkId");
    //this.httpd.get('http://192.168.0.3:8888/project/checkid.do',
    this.httpd.get(this.serviceProvider.data.host+'checkid.do',
    {
      // JSON.stringfy 쓰고 싶으면 header 에 content-type에 charset까지 명시
      params:{
        id:this.data.id
      }
    }).toPromise()
    .then(data => {
      console.log(data);
      //this.signupForm.controls['userId'].setErrors({'cantuse':null});
      if(data['result']=='fail'){
        console.log("사용불가");
        // hidden 되어 있는 메세지 출력
        this.idUsed=true;
        errorId.innerText=this.errorMessages.userId.cantuse;
        // 에러 초기화 안시켜줘도 알아서 초기화 된다. / 궁금하면 console 찍어보자
        this.signupForm.controls.userId.setErrors({'cantuse':true});
      }
    })
    .catch();
  }
  // submit 버튼을 눌렀을때 동작
  submitSignup(){
    this.triedToSubmit = true;
    // 만약 폼 에러시
    if(this.signupForm.invalid){
      for(var control in this.signupForm.controls){
        // dirty, touch 되었다고 만든다.
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
    // header 값을 담을 객체
    let httpOptions = {
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
    this.httpd.post(this.serviceProvider.data.host+'signup.do',
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
    
    // 회원가입이 끝나면 원래 페이지로 이동시킨다.
    this.navCtrl.pop();
  }
  // 폼 에러 체크후 상황에 맞는 문자를 저장해둔 객체
  errorMessages = {
    userId: {
      required: 'id 를 입력해주세요',
      minlength: '최소 4글자 이상 입력해주세요',
      cantuse: '이미 사용중인 아이디 입니다'
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

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

}
