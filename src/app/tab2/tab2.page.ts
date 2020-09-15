import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { WeatherService } from '../services/weather.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  city: string;
  state: string;
  val: any;
  
  constructor(
    public nav: Router,
    private storage : Storage,
    public navCtrl : NavController,
    private WeatherFetch:WeatherService    
  ) {
    this.storage.get('location').then((val) => {
      if(val != null){
        let location = JSON.parse(val)
        this.city = location.city;
        this.state = location.state;
      } 
      else{
        this.city = 'Mumbai',
        this.state = 'Maharashtra'
      }
    })
  }

  ngOnInit() {
  }

  saveForm(){
    this.nav
    let location = {
      city: this.city,
      state: this.state
    }

    
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.navigateRoot('');  
  }
}
