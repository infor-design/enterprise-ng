import { Component } from "@angular/core";

@Component({
    selector: 'app-searchfield-category-header-demo',
    templateUrl: 'header-searchfield-category.demo.html'
})
export class HeaderSearchfieldCategoryDemoComponent {
    searchfieldOptions: SohoSearchFieldOptions = {
        filterMode: 'contains',
        categories: [{ name: 'Product: 1', checked: true }, 'Product: 2', 'Product: 3'],
        showCategoryText: true,
        clearable: false,
    };
}