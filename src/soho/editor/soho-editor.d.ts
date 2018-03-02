/**
 * Soho Editor.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho editor control.
 */

interface SohoEditorButtons {
  editor: Array<any>;
  source: Array<any>;
}

/**
 * Editor Options
 */
interface SohoEditorOptions {
  buttons?: SohoEditorButtons;
  delay?: number;
  firstHeader?: string;
  secondHeader?: string;
  placeholder?: string;
  anchor?: SohoEditorAnchor;
  image?: SohoEditorOptionsImage;
  onLinkClick?: (e: JQuery.Event, elem: any) => void;
}

interface SohoEditorAnchor {
  url?: string;
  class?: string;
  target?: 'Same window'|'New window'| any;
  isClickable?: boolean;
  showIsClickable?: boolean;
}

/**
 * @interface SohoEditorOptionsImage
 */
interface SohoEditorOptionsImage {
  url?: string;
}

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoEditorStatic {

  /**
   * Current in use options.
   */
  settings: SohoEditorOptions;

  /**
   * Disable the editor.
   */
  disable(): void;

  /**
   * Enable the editor.
   */
  enable(): void;

  /**
   * Make the editor readonly.
   */
  readonly(): void;

  /**
   * Refresh the editor with new settings.
   */
  updated(): void;

  /**
   * Destroy any resource created by the control.
   */
  destroy(): void;

}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  editor: SohoEditorStatic;
}

interface JQuery {
  editor(options?: SohoEditorOptions): JQuery;
}

/**
 * Soho Editor Event
 */
interface SohoEditorEvent {
}
