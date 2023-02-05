import { Component, OnInit } from '@angular/core';
import { ExchangeApiService } from '../exchange-api.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.sass']
})
export class ConverterComponent implements OnInit {
  UAHtoUSD!: number;
  UAHtoEUR!: number;

  amount_left = 0;
  amount_right = 0;
  currency_left = 'USD'
  currency_right = 'UAH'

  constructor(private ExchangeApi: ExchangeApiService) { }

  async ngOnInit(): Promise<void> {
    this.UAHtoUSD = await this.ExchangeApi.getExchangeUAHtoUSD()
    this.UAHtoEUR = await this.ExchangeApi.getExchangeUAHtoEUR()
  }

  switchCurrency() {
    [this.currency_left, this.currency_right] = [this.currency_right, this.currency_left]
  }

  calculate_l(amount: number, currency: string) {
    if (currency === this.currency_right) {
      this.amount_left = amount
      this.amount_right = amount
    }

    // It uses saved (UAH to USD) and (UAH to EUR) proportion
    // to save limited free API uses, but can be easier done
    // by using repeatable querries
    // `https://api.apilayer.com/exchangerates_data/convert?to=${TO}&from=${FROM}&amount=${AMOUNT}`

    if ((currency === 'UAH') && (this.currency_right === 'USD')) {
      this.amount_right = Number((amount*this.UAHtoUSD).toFixed(2))
    }
    if ((currency === 'USD') && (this.currency_right === 'UAH')) {
      this.amount_right = Number((amount/this.UAHtoUSD).toFixed(2))
    }
    if ((currency === 'UAH') && (this.currency_right === 'EUR')) {
      this.amount_right = Number((amount*this.UAHtoEUR).toFixed(2))
    }
    if ((currency === 'EUR') && (this.currency_right === 'UAH')) {
      this.amount_right = Number((amount/this.UAHtoEUR).toFixed(2))
    }
    if ((currency === 'USD') && (this.currency_right === 'EUR')) {
      this.amount_right = Number((amount*(this.UAHtoEUR/this.UAHtoUSD)).toFixed(2))
    }
    if ((currency === 'EUR') && (this.currency_right === 'USD')) {
      this.amount_right = Number((amount*(this.UAHtoUSD/this.UAHtoEUR)).toFixed(2))
    }
  }

  calculate_r(amount: number, currency: string) {
    if (currency === this.currency_left) {
      this.amount_left = amount
      this.amount_right = amount
    }
    if ((currency === 'UAH') && (this.currency_left === 'USD')) {
      this.amount_left = Number((amount*this.UAHtoUSD).toFixed(2))
    }
    if ((currency === 'USD') && (this.currency_left === 'UAH')) {
      this.amount_left = Number((amount/this.UAHtoUSD).toFixed(2))
    }
    if ((currency === 'UAH') && (this.currency_left === 'EUR')) {
      this.amount_left = Number((amount*this.UAHtoEUR).toFixed(2))
    }
    if ((currency === 'EUR') && (this.currency_left === 'UAH')) {
      this.amount_left = Number((amount/this.UAHtoEUR).toFixed(2))
    }
    if ((currency === 'USD') && (this.currency_left === 'EUR')) {
      this.amount_left = Number((amount*(this.UAHtoEUR/this.UAHtoUSD)).toFixed(2))
    }
    if ((currency === 'EUR') && (this.currency_left === 'USD')) {
      this.amount_left = Number((amount*(this.UAHtoUSD/this.UAHtoEUR)).toFixed(2))
    }
  }


}
