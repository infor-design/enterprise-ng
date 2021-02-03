import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SohoRatingComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-rating-demo',
  templateUrl: 'rating.demo.html'
})
export class RatingDemoComponent implements AfterViewInit {
  @ViewChild('sohoRating') rating!:SohoRatingComponent;

  public currentValue?: number;

  ngAfterViewInit() {
    if (this.rating) {
      this.currentValue = this.rating.currentValue;
    }
  }

  public readonly(): void {
    if (this.rating) {
      this.rating.readonly();
    }
  }

  public enable(): void {
    if (this.rating) {
      this.rating.enable();
    }
  }

  public onClick(): void {
    this.currentValue = this.rating.currentValue;
  }
}
