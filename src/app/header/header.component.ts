import { Component, OnInit } from '@angular/core';
import { ExchangeApiService } from '../exchange-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  UAHtoUSD!: number;
  UAHtoEUR!: number;
  selected = 'USD';

  constructor(private ExchangeApi: ExchangeApiService) { }

  async ngOnInit(): Promise<void> {
    this.UAHtoUSD = await this.ExchangeApi.getExchangeUAHtoUSD()
    this.UAHtoEUR = await this.ExchangeApi.getExchangeUAHtoEUR()
  }
  
  displayedCurrency(toCurrency: string) {
    switch (toCurrency) {
      case 'USD':
        return 1/this.UAHtoUSD
      case 'EUR':
        return 1/this.UAHtoEUR
      case 'UAH':
        return 1
      default:
        return 'ERROR'
    }
  }

}
