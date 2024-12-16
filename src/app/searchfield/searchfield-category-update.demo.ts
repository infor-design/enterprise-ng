
import {
  Component,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-searchfield-category-update-demo',
    templateUrl: 'searchfield-category-update.demo.html',
    standalone: false
})
export class SearchFieldCategoryUpdateDemoComponent  {
  @ViewChild(SohoSearchFieldComponent, { static: true }) searchfield!: SohoSearchFieldComponent;

  query = "";
  categoryMultiselect = true;
  showCategoryText = true;
  categories = [
    {
      name: "Cats",
      value: "CATS",
      checked: true,
    },
    {
      name: "Dogs",
      value: "DOGS",
      checked: true,
    },
    {
      name: "Hippos",
      value: "HIPPOS",
      checked: true,
    },
    {
      name: "Parrots",
      value: "PARROTS",
      checked: true,
    }
  ]

  constructor() {
  }

  updateSearchfield() {
    this.categories.forEach((cat) => cat.checked = !cat.checked);
    this.searchfield.updated();
  }
}
