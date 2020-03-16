import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoHierarchyComponent } from 'ids-enterprise-ng';
import { DomSanitizer } from '@angular/platform-browser';
import { HierarchyDemoService } from './hierarchy.demo.service';

@Component({
  selector: 'app-hierarchy-paging-demo',
  templateUrl: 'hierarchy-paging.demo.html',
  styleUrls: ['./hierarchy.demo.css'],
  providers: [HierarchyDemoService]
})
export class HierarchyPagingDemoComponent implements OnInit {

  @ViewChild('SohoHierarchy') sohoHierarchy: SohoHierarchyComponent;

  public data: Array<any>;
  public legend: Array<SohoHierarchyLegend>;
  public leafTemplate: any;
  public leafTemplateId = 'hierarchyChartTemplate';
  public legendKey = 'EmploymentType';

  constructor(
    private domSanitizer: DomSanitizer,
    private hierarchyService: HierarchyDemoService
  ) {}

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
      this.data = data[ 0 ].pagingDataSet;
    });
  }

  onSelected(hierarchyEvent: SohoHierarchyEvent) {
    console.log(hierarchyEvent.data, hierarchyEvent.eventType);

    if (hierarchyEvent.eventType === 'back') {
      this.sohoHierarchy.reloadDataSet(hierarchyEvent.data.parentDataSet);
    } else if (!hierarchyEvent.data.isLoaded && !hierarchyEvent.data.isLeaf) {
      this.hierarchyService.getHierarchyData().subscribe((data) => {
        hierarchyEvent.data.children = data[0].lazyDataSet;
        this.sohoHierarchy.reloadDataSet(hierarchyEvent.data);
      });
    }
  }
}
