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

  defaultButtons: SohoButtonOptions[] = [
    {
      id: 'btn-0',
      text: 'Button 0',
      style: undefined
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

  public get buttonCount() {
    if (this.buttonset) {
      return this.buttonset.buttonAPIs.length;
    } else {
      return this.defaultButtons.length;
    }
  }

  public demoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      bthCount: [0],
      buttonsetStyle: ['default'],
      btnText: ['', Validators.required],
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

    this.demoForm.controls['type'].valueChanges.subscribe((val) => {
      if (val === 'btn-icon') {
        const iconCtrl = this.demoForm.controls['icon'];
        if (iconCtrl.value === '') {
          this.demoForm.controls['icon'].setValue('icon-settings');
        }
      }

      if (val === 'btn-actions') {
        this.demoForm.controls['audible'].disable();
      } else {
        this.demoForm.controls['audible'].enable();
      }

      if (val === 'btn-toggle') {
        const toggleIconCtrl = this.demoForm.controls['toggleIcon'];
        toggleIconCtrl.enable();
        if (toggleIconCtrl.value === '') {
          toggleIconCtrl.setValue('circles');
        }
      } else {
        const toggleIconCtrl = this.demoForm.controls['toggleIcon'];
        toggleIconCtrl.disable();
      }

      if (this.isStyledType) {
        const styleCtrl = this.demoForm.controls['style'];
        if (styleCtrl.value === 'default') {
          this.demoForm.controls['style'].setValue('btn');
        }
      }
    });
  }

  ngAfterViewInit() {
    // Having issue getting .buttons working
    this.buttonset.updated({ buttons: this.defaultButtons });
  }

  public reset() {
    // Removes all buttons from the buttonset
    this.buttonset.removeAll(true);
    this.demoForm.reset();
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
    this.handleButtonWidths();
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

  public get isToggleButton() {
    return this.demoForm.controls['type'].value === 'btn-toggle';
  }

  public get isIconBtn() {
    return this.demoForm.controls['type'].value === 'btn-icon';
  }

  public get cannotHaveIcons() {
    const val = this.demoForm.controls['type'].value;
    return this.autoIconTypes.indexOf(val) > -1;
  }

  public get isStyledType() {
    const val = this.demoForm.controls['type'].value;
    return this.defaultStyleTypes.indexOf(val) > -1;
  }
}
