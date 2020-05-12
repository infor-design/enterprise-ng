import {
  Component,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { SohoButtonsetComponent } from 'projects/ids-enterprise-ng/src/lib';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buttonset-demo',
  templateUrl: 'buttonset.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsetDemoComponent {

  autoIconTypes = ['btn-toggle', 'btn-actions', 'icon-favorite'];
  defaultStyleTypes = ['btn-icon', 'btn-menu', 'btn-actions', 'btn-toggle'];
  idCount = 0;

  newSettings: SohoButtonOptions = {
  };

  // const toggleIconsRollout = $('.toggle-icons-rollout');
  // const standardIconsRollout = $('.standard-icons-rollout');
  // const btnCount = $('#button-count');

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
  private buttonset: SohoButtonsetComponent;

  private demoForm: FormGroup;

  public model = {
    buttonsetStyle: '',
    buttonOptions: {
      text: '',
      audible: false,
      disabled: false,
      style: 'default',
      type: 'default',
      icon: '',
      toggleIcon: ''
    }
  };
  standardIconsRollout: any;
  btnCount: any;
  toggleIconsRollout: any;

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      buttonsetStyle: [this.model.buttonsetStyle],
      text: [this.model.buttonOptions.text],
      audible: [this.model.buttonOptions.audible],
      disabled: [this.model.buttonOptions.disabled],
      style: [this.model.buttonOptions.style],
      type: [this.model.buttonOptions.type],
      icon: [this.model.buttonOptions.icon],
      toggleIcon: [this.model.buttonOptions.toggleIcon]
    });
  }

  // Removes all buttons from the buttonset
  public reset() {
    this.buttonset.removeAll(true);

    this.idCount = 0;
    this.newSettings = {};
    this.demoForm.reset();
    this.setPageState();
  }

  public setButtonsetStyle() {
    const style = $('[name="buttonset-style"]:checked').val() as string;
    this.buttonset.updated({
      style: style
    });

    this.handleButtonWidths();
  }

  public setId() {
    this.newSettings.id = 'test-btn-' + this.idCount;
  }

  public setText() {
    this.newSettings.text = this.model.buttonOptions.text;
  }

  public setDisabled() {
    const disabled = $('#btn-disabled').prop('checked');
    this.newSettings.disabled = disabled;
  }

  public setStyle() {
    const style = $('#btn-style').val() as string;
    if (style && style.length) {
      this.newSettings.style = style;
    }
  }

  public setType() {
    const type = $('#btn-type').val() as string;
    if (type && type.length) {
      this.newSettings.type = type;
    }
  }

  public setIcon() {
    if (this.autoIconTypes.indexOf(this.newSettings.type) > -1) {
      if (this.newSettings.icon) {
        delete this.newSettings.icon;
      }
      return;
    }
    const icon = $('#btn-icon-def').val() as string;
    if (icon && icon.length) {
      this.newSettings.icon = icon;
    } else {
      delete this.newSettings.icon;
    }
  }

  public setToggleIcons() {
    if (this.newSettings.type !== 'btn-toggle') {
      return;
    }

    const val = $('#btn-toggle-icon-def').val();
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

  public setAudible() {
    const val = $('#btn-audible').prop('checked');
    this.newSettings.audible = val;
  }

  // For Modal Buttons, simulates the "sizing" that would happen in an actual modal
  public adjustBtnWidths(btns) {
    const btnPercentageWidth = 100 / btns.length;
    btns.forEach(function (btn) {
      btn.element[0].style.width = '' + btnPercentageWidth + '%';
    });
  }

  public resetBtnWidths(btns) {
    btns.forEach(function (btn) {
      btn.element[0].style.width = '';
    });
  }

  public handleButtonWidths() {
    const style = $('[name="buttonset-style"]:checked').val();
    if (style === 'modal') {
      this.adjustBtnWidths(this.buttonset.buttons);
    } else {
      this.resetBtnWidths(this.buttonset.buttons);
    }
  }

  // Gets all the control values
  public getSettings() {
    this.setId();
    this.setDisabled();
    this.setText();
    this.setStyle();
    this.setType();
    this.setIcon();
    this.setToggleIcons();
    this.setAudible();
  }

  public submit() {
    this.getSettings();
    this.buttonset.add(this.newSettings, true);
    this.idCount += 1;
    // delete newSettings.id;
    this.setPageState();
  }

  // Sets the current state of some of the page controls
  public setPageState() {
    const val = $('#btn-type').val() as string;

    // Set current number of buttons
    this.btnCount.text(this.buttonset.buttons.length);

    this.handleButtonWidths();

    // Disable the Toggle Button definitions if we're not working with a Toggle Button
    const isToggleBtn = (val === 'btn-toggle');
    this.toggleIconsRollout[isToggleBtn ? 'removeClass' : 'addClass']('hidden');
    this.toggleIconsRollout.children('input, select').each(function (i, input: HTMLButtonElement) {
      input.disabled = !isToggleBtn;
      const api = $(input).data('dropdown');
      if ($(input).is('.dropdown') && api) {
        api.pseudoElem[isToggleBtn ? 'removeClass' : 'addClass']('is-disabled');
      }
    });

    // Disable the Standard Icon Button definitions if the type doesn't support a user-definable 'icon' setting.
    const cannotHaveIcons = this.autoIconTypes.indexOf(val) > -1;
    this.standardIconsRollout[cannotHaveIcons ? 'addClass' : 'removeClass']('hidden');
    this.standardIconsRollout.children('input, select').each(function (i, input: HTMLInputElement) {
      input.disabled = cannotHaveIcons;
      const api = $(input).data('dropdown');
      if ($(input).is('.dropdown') && api) {
        api.pseudoElem[cannotHaveIcons ? 'addClass' : 'removeClass']('is-disabled');
      }
    });

    // If explicitly choosing an icon button, you MUST have an icon.
    const isIconBtn = (val === 'btn-icon');
    const firstIconOpt = $('#btn-icon-def').find('option:first-child');
    firstIconOpt.prop('disabled', isIconBtn);
    if (isIconBtn && firstIconOpt.prop('selected')) {
      firstIconOpt.prop('selected', false);
      firstIconOpt.next().prop('selected', true);
    }

    // On an "actions" button, there's always an `#icon-more`, so there's no way to turn icons off.
    const isActionBtn = (val === 'btn-actions');
    const isAudibleBtn = $('#btn-audible');
    isAudibleBtn.prop('disabled', isActionBtn);

    // Disable the `default` Button Type if no styled button "type" is selected.
    const isStyledType = this.defaultStyleTypes.indexOf(val) > -1;
    const firstStyleOpt = $('#btn-style').find('option:first-child');
    firstStyleOpt.prop('disabled', !isStyledType);
    if (isStyledType && firstStyleOpt.prop('selected')) {
      firstStyleOpt.prop('selected', false);
      firstStyleOpt.next().prop('selected', true);
    }
  }
}
