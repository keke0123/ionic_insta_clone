import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  data:any={
    x:'',
    host:'http://192.168.0.8:8888/project/',
    thumnail:'1.jpeg'
  }

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }

  myService(x){
    console.log("this.data.x = "+this.data.x);
    this.data.x=x;
    console.log("hello new data.x"+x);
  }

}
