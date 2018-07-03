import {
  Component,
  ViewChild,
  AfterContentChecked,
  ChangeDetectorRef,
  NgZone
 } from '@angular/core';

 import {
   SohoListViewComponent
 } from 'ids-enterprise-ng';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'soho-translate-pipe-demo',
  templateUrl: './locale-translate-pipe.demo.html'
})
export class LocaleTranslatePipeDemoComponent implements AfterContentChecked {

  demoForm: FormGroup;
  public locales = [
    { value: 'en-US', label: 'English (American)' },
    { value: 'en-GB', label: 'English (British)' },
    { value: 'ch-CN', label: 'Chinese (Simplified)' },
    { value: 'fr-FR', label: 'French (France)' }
  ];

  public locale: string;

  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private ngZone: NgZone) {

    this.locale = Soho.Locale.currentLocale.name;
    console.log('Initial locale ' + this.locale);

    this.demoForm = this.formBuilder.group({
      locale: [this.locale]
    });

    this.demoForm.controls['locale'].valueChanges.subscribe((value) => {
      console.log(value);

      this.ngZone.runOutsideAngular(() => {
        Soho.Locale.set(value).done(() => {
          this.ngZone.run(() => {
            this.ref.markForCheck();
          });
        });
      });
    });
  }

  // ngOnInit() {

  // }

  ngAfterContentChecked(): void {
  }

  public translate(value: string): string {
    return Soho.Locale.translate(value);
  }

}
