/**
 * Soho Personalize Control Typings.
 *
 * This component has no Soho api.
 */

/**
 * Configuration options.
 */
interface SohoPersonalizeOptions {
  colors?: string | SohoPersonalizeColors;
  theme?: string;

  /** Font is only accessible via the initial settings, and cannot be modified. */
  font?: string;
}

interface SohoPersonalizeEvent extends JQuery.TriggeredEvent {
  data: any;
}

interface SohoChangeThemePersonalizeEvent extends SohoPersonalizeEvent {
  theme?: string;
}

interface SohoChangeColorsPersonalizeEvent extends SohoPersonalizeEvent {
  colors?: SohoPersonalizeColors;
  isDefault?: boolean;
}

interface SohoPersonalizeColors {
  header?: string;
  subheader?: string;
  text?: string;
  verticalBorder?: string;
  horizontalBorder?: string;
  inactive?: string;
  hover?: string;
  btnColorHeader?: string;
  btnColorSubheader?: string;
}

interface SohoPersonalizeStatic {
  /**
   * Sets the current theme, blocking the ui during the change.
   *
   * @param theme  Represents the file name of a color
   * scheme (can be dark, light or high-contrast)
   */
  setTheme(theme: string): void;

 /**
  * Sets the personalization color(s)
  * @param colors The original hex color as a string or an object with all the Colors
  */
  setColors(colors: SohoPersonalizeColors | string): void;

  /**
   * Teardown - Remove added markup and events
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  personalize: SohoPersonalizeStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  personalize(options?: SohoPersonalizeOptions): JQuery;
}
