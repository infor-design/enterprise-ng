import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { SohoPersonalizeDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-personalize-color-api-demo',
  templateUrl: './personalize-color-api.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalizeColorApiDemoComponent implements OnInit {

  @ViewChild(SohoPersonalizeDirective) personalize: SohoPersonalizeDirective;

  JSON = JSON;
  themes: SohoTheme[];
  colors: SohoPersonalizationColors;
  showModel = false;

  model = {
    themeId: ' ',
    colorId: 'default'
  };

  private currentThemeId;
  private currentColorId;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.themes = this.personalize.themes();
    this.colors = this.personalize.personalizationColors();

    this.model.themeId = this.personalize.currentTheme.id;
    this.model.colorId = 'default';

    this.currentThemeId = this.model.themeId;
  }

  toggleModel() {
    console.log('personalize directive', this.personalize);
    this.showModel = !this.showModel;
  }

  onChangeTheme(event: SohoChangeThemePersonalizeEvent) {
    const themeId = event.data.theme;
    if (themeId === this.currentThemeId) {
      return; // themeId did not change
    }

    this.currentThemeId = themeId;
    this.model.themeId = themeId;

    this.colors = this.personalize.personalizationColors();
    this.model.colorId = 'default';

    this.ref.markForCheck(); // mark for check so personalization.theme input in messaged
  }

  onChangeColor(event: SohoChangeColorsPersonalizeEvent) {
    const colorIdArray = Object.keys(this.personalize.personalizationColors());
    const colorId = colorIdArray.find(cid => this.personalize.personalizationColors()[cid].value === event.data.colors);
    if (colorId === this.currentColorId) {
      return; // color did not change
    }

    this.model.colorId = colorId;
    this.ref.markForCheck();
  }

  onThemeChange(event: JQuery.TriggeredEvent) {
    const themeId = event.data;
    if (themeId === this.personalize.currentTheme.id) {
      return; // themeId did not change
    }

    this.currentThemeId = themeId;
    this.personalize.theme = themeId;

    this.colors = this.personalize.personalizationColors();
    this.model.colorId = 'default';

    this.ref.markForCheck(); // mark for check so personalization.theme input in messaged
  }

  onColorChange(event: JQuery.TriggeredEvent) {
    const colorId = event.data;
    if (colorId === this.currentColorId) {
      return;
    }
    this.currentColorId = colorId;

    const colorHex = this.personalize.personalizationColors()[colorId].value;
    this.personalize.colors = colorHex;
    this.ref.markForCheck(); // mark for check so personalization.colors input in messaged

    // const colorIdArray = Object.keys(this.personalize.personalizationColors());
    // const colorId = colorIdArray.find(colorId => this.personalize.personalizationColors()[colorId].value === event.data.colors);
    // this.model.colorId = colorId;
    // // this.ref.markForCheck();
  }
}
