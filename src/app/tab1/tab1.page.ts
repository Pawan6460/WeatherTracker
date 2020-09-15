import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import {Storage} from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  wind: any;
  data: any;
  main: any;
  humidity: any;
  pressure : any;
  loading: any;
  connection: any;
  ishidden: boolean;

  location : {
    city: string;
    state: string;
  }
  
  constructor(private WeatherFetch:WeatherService, private storage: Storage, public modalController: ModalController,private loadingController: LoadingController) {
    if (navigator.onLine) {
      console.log('Back online');
       this.ishidden = false;   
   } else {
       this.connection = 'Not Connected to Internet, Connect to a Network to Fetch Weather'
       this.ishidden = true;   
      }
  }

   ionViewWillEnter(){   
    /*asynchronous callup to storage location locally*/
    this.storage.get('location').then((val) => {
      if(val != null){
          this.location = JSON.parse(val);  /*values from Ionic Storage converted to json*/
        }
      else{
        this.location = {
          city: 'Mumbai',
          state: 'Maharashtra'
        }
      }
      
      this.WeatherFetch.getWeather(this.location.city, this.location.state).subscribe((weather: any) => {
        this.location = weather["name"];
        this.data = weather['weather'];
        this.main = weather.main.temp;
        this.humidity = weather.main.humidity;
        this.pressure = weather.main.pressure;
        this.wind = weather.wind.speed;
       });
    });
  }
  
}
