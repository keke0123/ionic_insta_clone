import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { UploadPage } from '../pages/upload/upload';
import { ProfilePage } from '../pages/profile/profile';
import { ContentPage } from '../pages/content/content';
import { SearchPage } from '../pages/search/search';
import { CommentPage } from '../pages/comment/comment';

import { TabPage } from '../pages/tab/tab';

import {Camera} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'

import {HTTP} from '@ionic-native/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ServiceProvider } from '../providers/service/service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    MainPage,
    UploadPage,
    ProfilePage,
    ContentPage,
    SearchPage,
    CommentPage,
    TabPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    MainPage,
    UploadPage,
    ProfilePage,
    ContentPage,
    SearchPage,
    CommentPage,
    TabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP, 
    HttpClientModule,
    Camera,ImagePicker,
    ServiceProvider
    
  ]
})
export class AppModule {}
