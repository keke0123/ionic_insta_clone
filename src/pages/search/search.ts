import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ContentPage } from '../content/content';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
 
  search:string='';
  searchMethod:string='tag';
  searchList:Array<object>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpd:HttpClient, private serviceProvider:ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    
    
  }
  getItems($event){
    console.log($event.target.value);
    this.search=$event.target.value;
    this.httpd.get(this.serviceProvider.data.host+'search.do',
    {
      params:{
        id:sessionStorage.getItem("id"),
        token:sessionStorage.getItem("token"),
        search:this.search,
        searchMethod:this.searchMethod
      }
      // header 
    }).toPromise()
    .then(data => {
      console.log(data);
      this.searchList=data['data'];
      console.log(this.searchList);
    }).catch(error => {
    });
  }
  // test
  test(){
    //console.log(this.searchMethod);
  }
  contentBtn(i){
    console.log(i);
    this.navCtrl.push(ContentPage,
      {
        search_id:this.searchList[i]['searchResult']
      }
    );
  }
}
