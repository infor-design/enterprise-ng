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
  templateUrl: './personalize-menu.component.html'
})
export class PersonalizeMenuComponent implements OnInit {
  @ViewChild(SohoPersonalizeDirective)
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
  public colourMenuItems: ColorMenuItem[];

  /**
   * Default Colour: this should really be based on the one selected in
   * the IDS Enterprise component code.
   */
  private readonly DEFAULT_COLOUR = '#368AC0';

  /**
   * Default Theme: this should really be based on the one selected in
   * the IDS Enterprise component code.
   */
  private readonly DEFAULT_THEME = 'light';

  /**
   * Storage key for the theme.
   */
  private readonly IDS_ENTERPRISE_THEME_KEY = 'soho_theme';

  /**
   * Storage key for the colour.
   */
  private readonly IDS_ENTERPRISE_COLOUR_KEY = 'soho_color';

  /**
   * Initialize the component after Angular first displays the data-bound
   * properties and sets the any input properties.
   *
   * In this case, initialises the data members: "colours" and "themes"
   * with the currently selected theme/colour respectively.
   */
  public ngOnInit(): void {
    // Get the current values using the getters.
    const currentTheme = this.personalize.theme = this.theme;
    const currentColour = this.personalize.colors = this.colour;

    this.themeMenuItems = this.personalize.themes();

    const personalizationColors = this.personalize.personalizationColors();
    this.colourMenuItems = Object.keys(personalizationColors).map(colorId => personalizationColors[colorId]);

    this.setSelectedTheme(currentTheme);
    this.setSelectedColor(currentColour);
  }

  setSelectedTheme(themeId: string) {
    // Make sure only the current theme is marked as selected.
    this.themeMenuItems.forEach((theme) => {
      theme.selected = (theme.id === themeId);
    });
  }

  setSelectedColor(color: string) {
    // Make sure only the current colour is marked as selected.
    this.colourMenuItems.forEach((colour) => {
      // The colour is appearing as a real rgb value, so need to
      colour.selected = (colour.value === color);
    });
  }
  /**
   * Handle the theme change event, by setting it in local storage.
   *
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
   * Handle the colour change event, by setting is in local storage.
   *
   * @todo may want to consider making the persistence of this
   * configurable, so we could use states.
   *
   * @param ev the personalisation event; never null.
   */

  public onChangeColors(ev: SohoChangeColorsPersonalizeEvent) {
    const colorHex = ev.data.colors;
    this.colour = colorHex;
    this.setSelectedColor(colorHex);
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
   * Returns the currently selected colour, defaulting to
   * a sensible default colour if one is not yet set.
   */
  public get colour(): string {
    const color = localStorage.getItem(this.IDS_ENTERPRISE_COLOUR_KEY);
    return color ? color : this.DEFAULT_COLOUR;
  }

  /**
   * Set the current colour, storing it such that it perists between
   * sessions.
   */
  public set colour(colour: string) {
    localStorage.setItem(this.IDS_ENTERPRISE_COLOUR_KEY, colour);
  }
}
