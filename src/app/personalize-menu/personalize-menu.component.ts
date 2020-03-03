import {
  Component,
  ViewChild,
  OnInit,
  HostBinding
} from '@angular/core';
import { SohoPersonalizeDirective } from 'ids-enterprise-ng';

interface ThemeMenuItem extends SohoTheme {
  selected?: boolean;
}

interface ColorMenuItem extends SohoPersonalizationColor {
  selected?: boolean;
}

@Component({
  selector: 'app-personalize-menu',
  templateUrl: 'personalize-menu.component.html'
})
export class PersonalizeMenuComponent implements OnInit {
  @ViewChild(SohoPersonalizeDirective, { static: true })
  private personalize: SohoPersonalizeDirective;

  /**
   * Mark as a popupmenu.
   */
  @HostBinding('class.popupmenu') isPopupMenu = true;

  /**
   * Mark as selectable.
   */
  @HostBinding('class.is-selectable') isSelectable = true;

  public themeMenuItems: ThemeMenuItem[];
  public colorMenuItems: ColorMenuItem[];

  /**
   * Default Theme: this should really be based on the one selected in
   * the IDS Enterprise component code.
   */
  private readonly DEFAULT_THEME = 'theme-soho-light';

  /**
   * Storage key for the theme.
   */
  private readonly IDS_ENTERPRISE_THEME_KEY = 'ids_theme';

  /**
   * Storage key for the color.
   */
  private readonly IDS_ENTERPRISE_COLOR_KEY = 'ids_color';

  /**
   * Initialize the component after Angular first displays the data-bound
   * properties and sets the any input properties.
   *
   * In this case, initialises the data members: "colors" and "themes"
   * with the currently selected theme/color respectively.
   */
  public ngOnInit(): void {
    // Get the current values using the getters.
    const currentTheme = this.personalize.theme = this.theme;
    const currentColor = this.personalize.colors = this.color;

    this.themeMenuItems = this.personalize.themes();
    const personalizationColors = this.personalize.personalizationColors();
    this.colorMenuItems = Object.keys(personalizationColors).map(colorId => personalizationColors[colorId]);

    this.setSelectedTheme(currentTheme);
    this.setSelectedColor(currentColor, false);
  }

  setSelectedTheme(themeId: string) {
    // Make sure only the current theme is marked as selected.
    this.themeMenuItems.forEach((theme) => {
      theme.selected = (theme.id === themeId);
    });
  }

  setSelectedColor(color: string, isDefault: boolean) {
    // Make sure only the current color is marked as selected.
    this.colorMenuItems.forEach((colorMenuItem) => {
      // The color is appearing as a real rgb value, so need to
      colorMenuItem.selected = (!isDefault && colorMenuItem.value === color);
    });
  }

  /**
   * Returns the currently selected color to "default".
   */
  setSelectedColorToDefault() {
    this.color = '';
    this.setSelectedColor('', true);
  }

  /**
   * Handle the theme change event, by setting it in local storage.
   * @todo may want to consider making the persistence of this
   * configurable, so we could use a state pattern.
   *
   * @param ev the personalisation event; never null.
   */
  public onChangeTheme(ev: SohoChangeThemePersonalizeEvent) {
    const themeId = ev.data.theme;
    this.theme = themeId;
    this.setSelectedTheme(themeId);
  }

  /**
   * Handle the color change event, by setting is in local storage.
   *
   * @todo may want to consider making the persistence of this
   * configurable, so we could use states.
   *
   * @param ev the personalisation event; never null.
   */

  public onChangeColors(ev: SohoChangeColorsPersonalizeEvent) {
    const colorHex = ev.data.colors;
    // Getting upper case colours and lower case colours, so assume lower.
    this.color = ev.data.isDefault ? '' : (colorHex as string).toLowerCase();
    this.setSelectedColor(this.color, true);
  }

  /**
   * Returns the currently selected theme, defaulting to
   * a sensible default theme if one is not yet set.
   */
  public get theme(): string {
    const theme = localStorage.getItem(this.IDS_ENTERPRISE_THEME_KEY);
    return theme ? theme : this.DEFAULT_THEME;
  }

  /**
   * Persists the given theme.
   *
   * @param themeName the theme name.
   */
  public set theme(themeName: string) {
    localStorage.setItem(this.IDS_ENTERPRISE_THEME_KEY, themeName);
  }

  /**
   * Returns the currently selected color, defaulting to
   * a sensible default color if one is not yet set.
   */
  public get color(): string {
    const color = localStorage.getItem(this.IDS_ENTERPRISE_COLOR_KEY);
    return color ? color : '';
  }

  /**
   * Set the current color, storing it such that it perists between
   * sessions.
   */
  public set color(color: string) {
    if (color === '') {
      localStorage.removeItem(this.IDS_ENTERPRISE_COLOR_KEY);
      return;
    }
    localStorage.setItem(this.IDS_ENTERPRISE_COLOR_KEY, color);
  }
}
