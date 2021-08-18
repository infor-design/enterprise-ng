
import {
  Component,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from 'ids-enterprise-ng';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-searchfield-category-demo',
  templateUrl: 'searchfield-category.demo.html'
})
export class SearchFieldCategoryDemoComponent implements AfterViewInit {
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
    // categories: [{ name: 'Books', checked: true }, 'Movies', 'TV Shows', 'Video Games'],
    categoryMultiselect: true,
    showCategoryText: true,
    clearable: false,
  };
  
  ngAfterViewInit(): void {
    this.setSelectedCategories();
  }
  
  onCategorySelected(): void {
    this.setSelectedCategories();
  }

  setSelectedCategories(): void {
    this.selectedCategories = this.searchfield.getCategoryData(true) || [];
  }
}
