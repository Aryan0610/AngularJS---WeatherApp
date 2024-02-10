import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {
  inputValue: any;
  city = "Mumbai";
  date: any;
  weatherData: any;
  error: string = '';
  imgUrl: any;

  ngOnInit(): void {
    this.setDate();
    this.getWeather(this.city);
  }

  setDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.date = today.toLocaleDateString('en-US', options)
  }

  onInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  async getWeather(city: string | undefined) {
    const apiKey = 'fede9162fab836b91d2e545486b90347';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const data = await fetch(url);
      if (data.ok) {
          const jsonData = await data.json();
          const tempInKelvin = jsonData.main.temp;
          const tempInCelsius = (tempInKelvin - 273.15).toFixed(2);
          jsonData.main.temp = tempInCelsius;
          this.weatherData = jsonData;
          this.error = ''
          this.imgUrl = `https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`
          if (this.inputValue !== undefined) this.city = jsonData.name
          console.log(jsonData)
        } else {
        this.error = 'Error retrieving weather data';
        }
    } catch (error) {
      this.error = 'Error retrieving weather data';
    }
  }
}