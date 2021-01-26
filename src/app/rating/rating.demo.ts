import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SohoRatingComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-rating-demo',
  templateUrl: 'rating.demo.html'
})
export class RatingDemoComponent implements AfterViewInit {
  @ViewChild('sohoRating') rating!:SohoRatingComponent;

  ngAfterViewInit() { }

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
}
