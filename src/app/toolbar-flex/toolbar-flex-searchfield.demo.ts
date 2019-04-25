import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-flex-searchfield-demo',
  templateUrl: './toolbar-flex-searchfield.demo.html'
})
export class ToolbarFlexSearchfieldDemoComponent {

  /**
   * Bindable Model value for getting what was typed in the search box.
   */
  public model = {
    searchValue: ''
  };

  /**
   * The set of options we link to in this example.
   */
  searchfieldOptions = {
    filterMode: 'contains',
  };

  onSelected(event) {
    let data = '';
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      data = event.item.selectedAnchor[0].dataset.action;
    } else {
      data = event.item.element.dataset.action;
    }
    alert(data);
  }

  /**
   * Change event we link to in this example.
   */
  onChange(event: SohoSearchFieldEvent) {
    alert('Search Changed ' + this.model.searchValue);
  }
}
