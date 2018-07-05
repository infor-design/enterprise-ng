import {
  Component,
  ViewChild,
  AfterContentChecked,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy
 } from '@angular/core';

import {
  FormGroup,
  FormBuilder
} from '@angular/forms';

 import {
   SohoListViewComponent
 } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-locale-pipe-demo',
  templateUrl: './locale-pipe.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalePipeDemoComponent {

  demoForm: FormGroup;

  public locales = [
    { value: 'en-US', label: 'English (American)' },
    { value: 'en-GB', label: 'English (British)' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'pt-BR', label: 'Portugese (Brazillian)' },
    { value: 'fr-FR', label: 'French (France)' }
  ];

  public model = {
    locale: '',
    datepicker: new Date(),
    number: 1000,
    resourceKey: 'Ok'
  };

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone) {

    // Make sure the locale is set.
    this.model.locale = Soho.Locale.currentLocale.name;

    // Create the demo form, and initialise with the model data.
    // Normally, this would be a two step process, setting
    // the data on a load event or via nsxs.
    this.demoForm = this.formBuilder.group({
      locale: [this.model.locale],
      datepicker: [this.model.datepicker],
      number: [this.model.number],
      resourceKey: [this.model.resourceKey]
    });

    // Listen for changes to the reactive form ...
    this.demoForm.valueChanges.subscribe(() => {
      // ... and assign the data to the model.
      // Ideally this would be sone in the submit, but for the
      // purpose of this demo do it on every change.
      this.model.number = this.demoForm.controls['number'].value;
      this.model.resourceKey = this.demoForm.controls['resourceKey'].value;
      this.ref.markForCheck();
    });

    this.demoForm.controls['datepicker'].valueChanges.subscribe((value) => {
      this.model.datepicker = Soho.Locale.parseDate(value) || new Date();
      this.ref.markForCheck();
    });

    // The locale selector requires the locale to be updated on the
    // Soho Locale object, this is done via a valueChanges listener.
    this.demoForm.controls['locale'].valueChanges.subscribe((value) => {

      /// Really changed?
      if (Soho.Locale.currentLocale.name !== value) {

        // ... as we're calling into jQuery code run outside
        // of angular ...
        this.ngZone.runOutsideAngular(() => {
          // ... setting the locale, and waiting for the locale to load ...
          Soho.Locale.set(value).done(
            () => {
              // ... once loaded, back into the angular zone ...
              this.ngZone.run(
                () => {
                  // ... update the display to ensure all controls are updated with the
                  // new locale.
                  this.ref.markForCheck();
                }
              );
           });
        });
      }
    });
  }
}
