import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  NgZone
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  selector: 'app-mask-demo',
  templateUrl: 'mask.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles:      [
      `
      .alignRight {
        text-align: right;
      }
    `
  ]
})
export class MaskDemoComponent {
  @HostBinding('class.alignRight') @Input() alignRight = false;

  demoForm: FormGroup;

  public locales = [
    { value: 'en-US', label: 'English (American)' },
    { value: 'en-GB', label: 'English (British)' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'pt-BR', label: 'Portugese (Brazillian)' },
    { value: 'fr-FR', label: 'French (France)' },
    { value: 'es-US', label: 'Spanish (American)' }
  ];

  public model = {
    locale:               'en-US',
    nomask:               '123456',
    number:               '123',
    decimal:              '123456.78',
    percent:              '85.23',
    currency:             '876543.21',
    signednumber:         '-123',
    signeddecimal:        '-1234567.89',
    signedpercent:        '-85.23',
    signedcurrency:       '-9876543.21',
    alphamask:            'abc12',
    custommask:           'ZZZ'
  };
  private _symbols: SohoMaskPatternSymbols = {
    currency: Soho?.Locale?.currentLocale?.data?.currencySign,
    decimal: Soho?.Locale?.currentLocale?.data?.numbers.decimal,
    negative: Soho?.Locale?.currentLocale?.data?.numbers.minusSign,
    thousands: Soho?.Locale?.currentLocale?.data?.numbers.group
  };
  private _patternOptions: SohoMaskPatternOptions = {
    allowDecimal: true,
    allowNegative: true,
    allowThousandsSeparator: true,
    integerLimit: 9,
    decimalLimit: 2,
    symbols: this._symbols,
    locale: 'en-US'
  };
  private _options: SohoMaskOptions = {
    process: 'number',
    patternOptions: this._patternOptions,
    placeholderChar: '#'
  };

  public showModel = true;
  /**
   * I cannot workout the syntax for a RexExp that works correctly in
   * an angular template, so the definitions have to be loaded from align
   * property.
   */
  public definitions = { 'U': /[A-Z]/ };

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.model.locale = Soho.Locale.currentLocale.name;

    this.demoForm = this.formBuilder.group({
      locale: [ this.model.locale ]
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
          Soho.Locale.set(value).done(() => {
            // ... once loaded, back into the angular zone ...
            this.ngZone.run(() => {
              // ... update the display to ensure all controls are updated with the
              // new locale.
              this.model.locale = value;

              // todo: updating the options object causes the MaskAPI to be lost.
              // mast-input.js init() adds the MastAPI but calling updated(settings) does not.
              (this._options?.patternOptions as any).locale = value;
              this._options = Object.assign({}, this._options);

              this.ref.markForCheck();
            });
          });
        });
      }
    });
  }

  pipe = (processResult: any, _opts: any) => {
    console.log('pipe was executed');
    return processResult.conformedValue + ' | ';
  }

  get symbols(): string {
    return JSON.stringify(this._symbols);
  }

  get patternOptions(): string {
    return JSON.stringify(this._patternOptions);
  }

  get options(): string {
    return JSON.stringify(this._options);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onMaskWrite(_event: SohoMaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }
}
