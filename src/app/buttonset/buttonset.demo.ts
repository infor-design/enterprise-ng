import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SohoButtonsetComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-buttonset-demo',
  templateUrl: 'buttonset.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsetDemoComponent implements AfterViewInit {

  private autoIconTypes = ['btn-toggle', 'btn-actions', 'icon-favorite'];
  private defaultStyleTypes = ['btn-icon', 'btn-menu', 'btn-actions', 'btn-toggle'];

  private newSettings: SohoButtonOptions = {};

  defaultButtons = [
    {
      id: 'btn-0',
      text: 'Button 0'
    },
    {
      id: 'btn-1',
      style: 'btn-primary',
      text: 'Button 1'
    },
    {
      id: 'btn-2',
      style: 'btn-secondary',
      text: 'Button 2',
      icon: 'icon-settings'
    },
    {
      id: 'btn-3',
      style: 'btn-tertiary',
      text: 'Button 3',
      icon: 'icon-mail'
    },
    {
      id: 'btn-4',
      style: 'btn-destructive',
      text: 'Button 4'
    }
  ];

  @ViewChild(SohoButtonsetComponent)
  public buttonset: SohoButtonsetComponent;

  public demoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      bthCount: [0],
      buttonsetStyle: ['default'],
      btnText: [''],
      audible: [false],
      disabled: [false],
      style: ['default'],
      type: ['default'],
      icon: [''],
      toggleIcon: ['']
    });

    this.demoForm
      .controls['buttonsetStyle']
      .valueChanges
      .subscribe((newStyle) => {
        this.buttonset.style = newStyle;
        this.handleButtonWidths();
      });

    this.demoForm.statusChanges.subscribe(
      (v) => {
        Object.keys(this.demoForm.controls).forEach(key => {
          const c: AbstractControl = this.demoForm.get(key);
          this.demoForm.controls
          if (key !== 'btnText') {
            if (c.valid) {
              c.enable();
            } else {
              c.disable();
            }
          }
        });
      });
  }

  ngAfterViewInit() {
    // Having issue getting .buttons working
    this.buttonset.updated({ buttons: this.defaultButtons });
  }

  // Removes all buttons from the buttonset
  public reset() {
    this.buttonset.removeAll(true);
    this.demoForm.reset();
    this.setPageState();
  }

  submit() {
    this.newSettings = {
      audible: this.demoForm.controls.audible.value,
      disabled: this.demoForm.controls.disabled.value,
      id: 'test-btn-' + (this.buttonset.buttonAPIs.length + 1),
      style: this.demoForm.controls.style.value,
      text: this.demoForm.controls.btnText.value,
      type: this.demoForm.controls.type.value
    };

    this.setIcon();
    this.setToggleIcons();

    this.buttonset.add(this.newSettings, true);
    this.setPageState();
  }

  public setIcon() {
    if (this.autoIconTypes.indexOf(this.demoForm.controls.type.value) > -1) {
      return;
    }

    const icon = this.demoForm.controls.icon.value;
    if (icon && icon.length) {
      this.newSettings.icon = icon;
    }
  }

  public setToggleIcons() {
    if (this.demoForm.controls.type.value !== 'btn-toggle') {
      return;
    }

    const val = this.demoForm.controls.toggleIcon.value;
    let toggleOnIcon;
    let toggleOffIcon;

    switch (val) {
      case 'circles':
        toggleOnIcon = 'icon-confirm';
        toggleOffIcon = 'icon-empty-circle';
        break;
      case 'hearts':
        toggleOnIcon = 'heart-filled';
        toggleOffIcon = 'heart-outlined';
        break;
      case 'stars':
        toggleOnIcon = 'star-filled';
        toggleOffIcon = 'star-outlined';
        break;
    }

    this.newSettings.toggleOnIcon = toggleOnIcon;
    this.newSettings.toggleOffIcon = toggleOffIcon;
  }

  // For Modal Buttons, simulates the "sizing" that would happen in an actual modal
  public adjustBtnWidths(btns: SohoButtonStatic[]) {
    const btnPercentageWidth = 100 / btns.length;
    btns.forEach(function (btn) {
      btn.element[0].style.width = '' + btnPercentageWidth + '%';
    });
  }

  public resetBtnWidths(btns: SohoButtonStatic[]) {
    btns.forEach(function (btn: SohoButtonStatic) {
      btn.element[0].style.width = '';
    });
  }

  public handleButtonWidths() {
    if (this.demoForm.controls.buttonsetStyle.value === 'modal') {
      this.adjustBtnWidths(this.buttonset.buttonAPIs);
    } else {
      this.resetBtnWidths(this.buttonset.buttonAPIs);
    }
  }

  // Sets the current state of some of the page controls
  public setPageState() {
    // this.demoForm.controls.btnCount.setValue(this.buttonset.buttons.length);
    this.handleButtonWidths();

    // If the type is toggle, hide the
    this.demoForm.controls['type'].valueChanges.subscribe((val: string) => {
      if (val === 'btn-toggle') {
        this.demoForm.controls['icon'].disable();
        this.demoForm.controls['toggleIcon'].enable();
      }

      const cannotHaveIcons = this.autoIconTypes.indexOf(val) > -1;
      this.demoForm.controls['icon'].disable();


    });

    // disable = this.demoForm.controls.

    // // Disable the Toggle Button definitions if we're not working with a Toggle Button
    // const isToggleBtn = (val === 'btn-toggle');
    // this.toggleIconsRollout[isToggleBtn ? 'removeClass' : 'addClass']('hidden');
    // this.toggleIconsRollout.children('input, select').each(function (i, input: HTMLButtonElement) {
    //   input.disabled = !isToggleBtn;
    //   const api = $(input).data('dropdown');
    //   if ($(input).is('.dropdown') && api) {
    //     api.pseudoElem[isToggleBtn ? 'removeClass' : 'addClass']('is-disabled');
    //   }
    // });

    // Disable the Standard Icon Button definitions if the type doesn't support a user-definable 'icon' setting.
    // const cannotHaveIcons = this.autoIconTypes.indexOf(val) > -1;
    // this.standardIconsRollout[cannotHaveIcons ? 'addClass' : 'removeClass']('hidden');
    // this.standardIconsRollout.children('input, select').each(function (i, input: HTMLInputElement) {
    //   input.disabled = cannotHaveIcons;
    //   const api = $(input).data('dropdown');
    //   if ($(input).is('.dropdown') && api) {
    //     api.pseudoElem[cannotHaveIcons ? 'addClass' : 'removeClass']('is-disabled');
    //   }
    // });

    // If explicitly choosing an icon button, you MUST have an icon.
    // const isIconBtn = (val === 'btn-icon');
    // const firstIconOpt = $('#btn-icon-def').find('option:first-child');
    // firstIconOpt.prop('disabled', isIconBtn);
    // if (isIconBtn && firstIconOpt.prop('selected')) {
    //   firstIconOpt.prop('selected', false);
    //   firstIconOpt.next().prop('selected', true);
    // }

    // // On an "actions" button, there's always an `#icon-more`, so there's no way to turn icons off.
    // const isActionBtn = (val === 'btn-actions');
    // const isAudibleBtn = $('#btn-audible');
    // isAudibleBtn.prop('disabled', isActionBtn);

    // Disable the `default` Button Type if no styled button "type" is selected.
    // const isStyledType = this.defaultStyleTypes.indexOf(val) > -1;
    // const firstStyleOpt = $('#btn-style').find('option:first-child');
    // firstStyleOpt.prop('disabled', !isStyledType);
    // if (isStyledType && firstStyleOpt.prop('selected')) {
    //   firstStyleOpt.prop('selected', false);
    //   firstStyleOpt.next().prop('selected', true);
    // }
  }
}
