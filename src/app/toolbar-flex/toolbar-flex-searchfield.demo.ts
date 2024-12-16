import { Component, ViewChild } from '@angular/core';

import { SohoToolbarFlexSearchFieldComponent } from 'ids-enterprise-ng';

/**
 * Matches a function used in a similar IDS Enterprise test for checking
 * the text size, and adjusting the size of the collapsed Searchfield accordingly.
 */
const collapseSizeOptions = [
  undefined,
  200,
  function textbasedCollapseSize(api: SohoSearchFieldStatic) {
    const charWidth = 10;
    const frontPadding = 64;
    let buttonSize = 0;
    const contents = `${api.element.val()}`;

    if ((api.categoryButton instanceof $) && api.categoryButton.length) {
      const buttonStyle = window.getComputedStyle(api.categoryButton[0]);
      const buttonWidth = api.categoryButton.width();
      const buttonBorder = parseInt(buttonStyle.borderLeftWidth, 10) * 2;
      const buttonPadding = parseInt(buttonStyle.paddingLeft, 10) +
        parseInt(buttonStyle.paddingRight, 10);

      if (buttonWidth) {
        buttonSize += (buttonWidth + buttonBorder + buttonPadding + 4);
      }
    }

    // Can't be bigger than 300px.
    const maxSize = 300;
    const targetSize = (buttonSize > 0 ? buttonSize : frontPadding) + (charWidth * contents.length);

    return targetSize < maxSize ? targetSize : maxSize;
  }
];

@Component({
    selector: 'app-toolbar-flex-searchfield-demo',
    templateUrl: 'toolbar-flex-searchfield.demo.html',
    standalone: false
})
export class ToolbarFlexSearchfieldDemoComponent {
  @ViewChild(SohoToolbarFlexSearchFieldComponent) toolbarFlexSearchField!: SohoToolbarFlexSearchFieldComponent;

  /**
   * Bindable Model value for getting what was typed in the search box.
   */
  public model = {
    searchValue: '',
    collapsible: false
  };

  /**
   * The set of options we link to in this example.
   */
  searchfieldOptions = {
    filterMode: 'contains',
    collapsible: false,
    collapseSize: collapseSizeOptions[0]
  };

  onSelected(event: any) {
    let data = '';
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      data = event.item.selectedAnchor[0].dataset.action;
    } else {
      data = event.item.element.dataset.action;
    }
    alert(data);
  }

  /**
   * Change Event, fired by the Searchfield, when its value is changed
   */
  onValueChange(_event: SohoSearchFieldEvent) {
    console.log(`Searchfield Value Changed: ${this.model.searchValue}`);
  }

  /**
   * Change Event, fired by the Checkbox that disables/enables collapsing of the Searchfield.
   */
  onCollapsibleChange(event: JQuery.TriggeredEvent) {
    const value = event.target.checked;
    this.searchfieldOptions.collapsible = value;
    this.toolbarFlexSearchField.updated(this.searchfieldOptions);
  }

  /**
   * Change Event, fired by the Radio Buttons that control `collapseSize`, when they are changed.
   */
  onCollapseSizeChange(event: JQuery.TriggeredEvent) {
    const value = Number(event.target.value);
    const mapping: any = {
      0: 'undefined (CSS-Driven)',
      1: 'Static Number (200)',
      2: 'Function-based (Resolves to Number)'
    };
    const textValue = mapping[value];

    this.searchfieldOptions.collapseSize = collapseSizeOptions[value];
    this.toolbarFlexSearchField.updated(this.searchfieldOptions);
    console.log(`Searchfield 'collapseSize' setting changed to ${textValue}`);
  }
}
