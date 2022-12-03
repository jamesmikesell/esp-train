import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { delay, firstValueFrom, interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private lastUpdate = Date.now();
  private valueToSend?: number;
  private subscription?: Subscription;

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
    vertical: true,
  };

  constructor(private httpClient: HttpClient) { }

  async sliderChange(event: ChangeContext): Promise<void> {
    this.valueToSend = event.value;


    if (this.subscription && !this.subscription.closed)
      return;

    let resendDelay = 500;
    let timeSinceLastSend = Date.now() - this.lastUpdate;
    if (timeSinceLastSend > resendDelay) {
      this.send();
    } else {
      this.subscription = timer(resendDelay - timeSinceLastSend).subscribe(() => this.send());
    }

  }


  private async send(): Promise<void> {
    this.lastUpdate = Date.now();
    let state = this.valueToSend ? "on" : "off";

    await firstValueFrom(this.httpClient.post<any>(`/fan/train_speed_slider/turn_on?speed_level=${this.valueToSend}`, {}));
    await firstValueFrom(this.httpClient.post<any>(`/fan/train_speed_slider/turn_${state}`, {}));
  }

}
