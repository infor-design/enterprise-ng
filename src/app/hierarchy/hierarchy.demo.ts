import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HierarchyDemoService } from './hierarchy.demo.service';
import { SohoHierarchyComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-hierarchy-demo',
  templateUrl: 'hierarchy.demo.html',
  styleUrls: ['./hierarchy.demo.css'],
  providers: [HierarchyDemoService]
})
export class HierarchyDemoComponent implements OnInit, AfterViewChecked {

  @ViewChild('SohoHierarchy') sohoHierarchy: SohoHierarchyComponent;

  public data: Array<any>;
  public legend: Array<SohoHierarchyLegend>;
  public leafTemplate: any;
  public leafTemplateId = 'hierarchyChartTemplate';
  public legendKey = 'EmploymentType';

  // Flag to allow the lazy load data to only be used once
  private lazyDataLoaded = false;
  private initializing = true;

  constructor(
    private domSanitizer: DomSanitizer,
    private hierarchyService: HierarchyDemoService
  ) { }

  ngOnInit() {
    this.legend = [
      { 'value': 'FT', 'label': 'Full Time' },
      { 'value': 'PT', 'label': 'Part Time' },
      { 'value': 'C', 'label': 'Contractor' },
      { 'value': 'O', 'label': 'Open Position' }
    ];

    const leafTemplate = `
        <script type="text/html" id="${this.leafTemplateId}">
         <div class="leaf {{colorClass}}" id="{{id}}">
           {{#Picture}}
            <img src="{{Picture}}" class="image" alt="Image of {{Name}}"/>
           {{/Picture}}
           {{^Picture}}
            <span class="image-placeholder"></span>
           {{/Picture}}

           <div class="detail">
            <p class="heading">{{Name}}</p>
            <p class="subheading">{{Position}}</p>
            <p class="micro">{{EmploymentType}}</p>
           </div>
           {{#menu}}
            <button class="btn-actions btn-icon" type="button" data-init="false" id="btn-{{id}}">
              <svg role="presentation" aria-hidden="true" focusable="false" class="icon">
                <use href="#icon-more"></use>
              </svg>
              <span class="audible">More Info & Additional Actions</span>
            </button>
            <ul class="popupmenu"></ul>
          {{/menu}}
           <button class="btn btn-icon" type="button">
            <svg role="presentation" aria-hidden="true" focusable="false" class="icon">
             <use href="#icon-caret-up"/>
            </svg>
            <span class="audible">Expand/Collapse</span>
           </button>
         </div>
       </script>
      `;

    this.leafTemplate = this.domSanitizer.bypassSecurityTrustHtml(leafTemplate);

    this.hierarchyService.getHierarchyData().subscribe((data) => {
      this.data = data[0].initialDataSet;
    });
  }

  ngAfterViewChecked(): void {
    // Manually selects Partricia Clark
    // SetTimeout to give soho control a moment to render
    if (this.initializing && this.data && this.sohoHierarchy) {
      this.initializing = false;
      setTimeout(() => this.sohoHierarchy.selectLeaf('1_1'));
    }
  }

  onSelected(hierarchyEvent: SohoHierarchyEvent) {
    console.log(hierarchyEvent.data, hierarchyEvent.eventType);

    if (hierarchyEvent.eventType === 'expand' && !this.lazyDataLoaded) {
      this.hierarchyService.getHierarchyData().subscribe((data) => {
        const newData = data[0].lazyDataSet;
        this.sohoHierarchy.add(hierarchyEvent.data.id, this.data, newData);
        this.lazyDataLoaded = true;
      });
    }

    // For demo purposes ignore updating original actions for id '1_3_2'
    // This one is used to illustrate a sub menu and disabled state
    if (hierarchyEvent.isActionsEvent && (hierarchyEvent.data.id !== '1_3_2' && hierarchyEvent.data.id !== '1_1')) {
      const actions = [{ value: 'action-1' }, { value: 'action-2' }];
      this.sohoHierarchy.updateActions(hierarchyEvent, actions);
    }
  }

  onDoubleClick(event: SohoHierarchyDoubleClickEvent) {
    console.log(event);
  }
}
