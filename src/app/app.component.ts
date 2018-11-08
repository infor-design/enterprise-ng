import {
  AfterViewChecked,
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';
import { SohoPersonalizeDirective } from 'ids-enterprise-ng';
import { SohoRenderLoopService } from '../../projects/ids-enterprise-ng/src/lib/renderLoop';

@Component({
  selector: 'body', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(SohoPersonalizeDirective) personalize: SohoPersonalizeDirective;

  public initialised = false;
  public renderLoopCount = 0;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(private renderLoop: SohoRenderLoopService) {
    Soho.Locale.culturesPath = '/assets/ids-enterprise/js/cultures/';
    Soho.Locale.set('en-US').done(() => {
      console.log('Locale set');
      this.initialised = true;
    });

    // this.setInitialPersonalization();
  }

  ngOnInit() {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewInit(): void {
    // Has to run after the view has been initialised otherwise
    // the personalise component is not ready.
    this.setInitialPersonalization();
  }

  ngAfterViewChecked() {
    // Display the current render loop in real time
    setTimeout(() => {
      this.renderLoopCount = this.renderLoop.getCurrentCount();
    });
  }

  setInitialPersonalization() {
    const theme = localStorage.getItem('soho_theme');
    let colors = localStorage.getItem('soho_color');
    if (theme) {
      this.personalize.theme = theme;
    }
    if (colors) {
      colors = JSON.parse(colors);
      this.personalize.colors = colors;
    }

    // const theme = localStorage.getItem('soho_theme');
    // const colors = localStorage.getItem('soho_color');
    // if (theme) {
    //   this.personalizeOptions = {
    //     theme
    //   };
    // }
    // if (colors) {
    //   if (this.personalizeOptions) {
    //     this.personalizeOptions.colors = colors;
    //   } else {
    //     this.personalizeOptions = {
    //       colors
    //     };
    //   }
    // }
  }

  onChangeTheme(ev: SohoChangeThemePersonalizeEvent) {
    console.log('Theme changed: ', ev);
    localStorage.setItem('soho_theme', ev.theme);
  }
  onChangeColors(ev: SohoChangeColorsPersonalizeEvent) {
    console.log('Colors changed: ', ev);
    localStorage.setItem('soho_color', JSON.stringify(ev.colors));
  }

  onStartRenderLoop() {
    this.renderLoop.start();
  }

  onStopRenderLoop() {
    this.renderLoop.stop();
  }
}
