import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {
  myHeaders = new Headers();
  ExchangeUAHtoUSD = 0
  ExchangeUAHtoEUR = 0

  constructor() {
    this.myHeaders.append("apikey", "VAULP1O5j9uJthFx6hRav0lDyo8GZyTG");    
  }

  async getExchangeUAHtoUSD() {
    if (this.ExchangeUAHtoUSD === 0) {
      return fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=UAH&amount=1`, 
      {method: 'GET', redirect: 'follow', headers: this.myHeaders})
        .then(response => response.text())
        .then(result => {
          this.ExchangeUAHtoUSD = JSON.parse(result).result
          console.log('aquired data: ', result)
          return JSON.parse(result).result
        })
    }
    else {
      console.log('saved data: ', this.ExchangeUAHtoUSD)
      return this.ExchangeUAHtoUSD
    }
  }

  async getExchangeUAHtoEUR() {
    if (this.ExchangeUAHtoEUR === 0) {
      return fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=UAH&amount=1`, 
      {method: 'GET', redirect: 'follow', headers: this.myHeaders})
        .then(response => response.text())
        .then(result => {
          this.ExchangeUAHtoEUR = JSON.parse(result).result
          console.log('aquired data: ', result)
          return JSON.parse(result).result
        })
    }
    else {
      console.log('saved data: ', this.ExchangeUAHtoEUR)
      return this.ExchangeUAHtoEUR
    }
  }
}

