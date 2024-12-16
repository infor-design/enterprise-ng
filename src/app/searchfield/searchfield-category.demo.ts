
import {
  Component,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-searchfield-category-demo',
    templateUrl: 'searchfield-category.demo.html',
    standalone: false
})
export class SearchFieldCategoryDemoComponent  {
  @ViewChild(SohoSearchFieldComponent, { static: true })
  private searchfield!: SohoSearchFieldComponent;

  /**
   * Bindable Model value for getting what was typed in the search box.
   */
  public model = {
    searchValue: ''
  };

  public selectedCategories: SohoSearchFieldCategory[] = [];

  /**
   * The set of options we link to in this example.
   */
  searchfieldOptions: SohoSearchFieldOptions = {
    filterMode: 'contains',
    categories: [{ name: 'Books', checked: false }, 'Movies', 'TV Shows', 'Video Games'],
    categoryMultiselect: true,
    showCategoryText: true,
    clearable: false,
  };
  
  onCategorySelected(): void {
    this.selectedCategories = this.searchfield.getCategoryData(true) || [];
  }
}
