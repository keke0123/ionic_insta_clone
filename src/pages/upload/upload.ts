import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  pImg:Array<string>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera:Camera, private imagePicker:ImagePicker, private httpd:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  // 사진 찍기 버튼 눌렀을때 사진 찍어서 출력하는 동작
  takeImg(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.pImg.push('data:image/jpeg;base64,' + imageData);
      

      //let headers = new Headers();

      // this.httpd.post('http://192.168.0.3:8888/project/upload.do',{
      //   // data
      // },{
      //   // header 
      // }).toPromise()
      // .then(data => {
      //   console.log(data);
      // }).catch(error => {
      // });

    }, (err)=>{ 
    });
  }

  pickImg(){
    const poptions: ImagePickerOptions={
      outputType: 1,
      quality: 70,
      width: 1024,
      height: 1024
    };
    this.imagePicker.getPictures(poptions).then((results) => {
      for(var i=0; i< results.length; i++){
        //this.pImg.push(results[i]);
        this.pImg.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {});
  }

}
