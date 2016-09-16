
export interface SohoModalDialogOptions {
  // Supports click, immediate
  trigger: 'click' | 'immediate';

  // Button configuration (can be supplied in-line)
  buttons: SohoModalDialogButton[];

  // Alert dialog?
  isAlert: boolean;

  // Allows the dialog content to be passed in.
  content: any;

  // Style information
  cssClass: string;

  // Auto focus?
  autoFocus: boolean;

  // Identifier for the dialog (seet in the markup)
  id: string;

  // Extra height?
  frameHeight: number; // 180 //Extra Height

  // Dialog title.
  title: string;
}

export interface SohoModalDialogButton {
  text: string;
  cssClass: string;
  isDefault: boolean;
  validate: boolean;
  id: string;

  // Type of control.
  type: string;

  // Optional icon for the button.
  icon: string;


}
