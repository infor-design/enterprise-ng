import {
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';

@Component({
  selector: 'body', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor() {
    // @todo Set the locale here, to ensure all the values are setup.
    Soho.Locale.set('en-US');
    this.setInitialPersonalization();
  }
  setInitialPersonalization() {
    const theme = localStorage.getItem('soho_theme');
    const colors = localStorage.getItem('soho_color');
    if (theme) {
      this.personalizeOptions = {
        theme,
      };
    }
    if (colors) {
      if (this.personalizeOptions) {
        this.personalizeOptions.colors = colors;
      } else {
        this.personalizeOptions = {
          colors,
        };
      }
    }
  }
  onChangeTheme(ev: SohoPersonalizeEvent) {
    console.log('Theme changed: ', ev);
    localStorage.setItem('soho_theme', ev.data);
  }
  onChangeColors(ev: SohoPersonalizeEvent) {
    console.log('Colors changed: ', ev);
    localStorage.setItem('soho_color', ev.data);
  }
}
