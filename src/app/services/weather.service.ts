import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  apiKey = 'cef40e8485592e977d968f9e4ac4cf86';
  url: any;
  currenWeather = 'current';

  constructor(private http: HttpClient,  public loadingController: LoadingController) { 
    this.url = 'https://api.openweathermap.org/data/2.5/weather';
  }

  getWeather(city, state){
    return this.http.get(this.url+'?q='+city+','+state+ '&appid='+this.apiKey);
  }
}
