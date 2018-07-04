import {
  Component,
  ViewChild,
  AfterContentChecked,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy
 } from '@angular/core';

 import {
   SohoListViewComponent
 } from 'ids-enterprise-ng';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'soho-translate-pipe-demo',
  templateUrl: './locale-translate-pipe.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleTranslatePipeDemoComponent {

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
    datevalue: new Date(),
    number: 1000,
    resourceKey: 'Ok'
  };

  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private ngZone: NgZone) {
    this.model.locale = Soho.Locale.currentLocale.name;

    this.demoForm = this.formBuilder.group({
      locale: [this.model.locale],
      datepicker: [this.model.datevalue],
      number: [this.model.number],
      resourceKey: [this.model.resourceKey]
    });

    this.demoForm.valueChanges.subscribe(() => {
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
                  // ... update the display to ensure all controls are updated.
                  this.ref.markForCheck();
                }
              );
           }
          );
        });
      }
    });
  }
}
