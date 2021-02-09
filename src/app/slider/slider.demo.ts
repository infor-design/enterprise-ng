import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

// @ts-ignore
import { SohoSliderComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-slider-demo',
  templateUrl: 'slider.demo.html',
  styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
})
export class SliderDemoComponent implements OnInit {
  @ViewChild(SohoSliderComponent, { static: true }) slider!: SohoSliderComponent;

  public sliderDisabled = false;
  public sliderReadOnly = false;
  public showModel = false;

  public model = {
    value: '20'
  };

  constructor() {}
  ngOnInit() {}

  onChange(event: SohoSliderEvent) {
    console.log('SliderDemoComponent.onChange: type=' + event.type);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setReadonly() {
    this.slider.readonly = true;
    this.sliderReadOnly = this.slider.readonly;
  }

  setDisable() {
    this.slider.disabled = true;
    this.sliderDisabled = this.slider.disabled;
  }

  setEnable() {
    this.slider.disabled = false;
    this.sliderDisabled = this.slider.disabled;

    this.slider.readonly = false;
    this.sliderReadOnly = this.slider.readonly;
  }
}
