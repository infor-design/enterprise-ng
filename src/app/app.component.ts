import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';
import { SohoPersonalizeDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'body', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild(SohoPersonalizeDirective) personalize: SohoPersonalizeDirective;

  public initialised = false;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor() {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(() => {
      console.log('Locale set');
      this.initialised = true;
    });

    this.setInitialPersonalization();
  }
  setInitialPersonalization() {
    const theme = localStorage.getItem('soho_theme');
    const colors = JSON.parse(localStorage.getItem('soho_color'));
    if (theme) {
      this.personalizeOptions = {
        theme
      };
    }
    if (colors) {
      if (this.personalizeOptions) {
        this.personalizeOptions.colors = colors;
      } else {
        this.personalizeOptions = {
          colors
        };
      }
    }
  }
  onChangeTheme(ev: SohoChangeThemePersonalizeEvent) {
    console.log('Theme changed: ', ev);
    localStorage.setItem('soho_theme', ev.theme);
  }
  onChangeColors(ev: SohoChangeColorsPersonalizeEvent) {
    console.log('Colors changed: ', ev);
    localStorage.setItem('soho_color', JSON.stringify(ev.colors));
  }

  ngAfterViewInit(): void {
    // this.personalize.theme = 'dark';
    // this.personalize.colors = '80000';;
    // this.personalize.font = 'source-sans';
  }

}
