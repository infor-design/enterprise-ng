import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HierarchyDemoService } from './hierarchy.demo.service';
import { SohoHierarchyComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-hierarchy-demo',
  templateUrl: './hierarchy.demo.html',
  styleUrls: ['./hierarchy.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HierarchyDemoService]
})
export class HierarchyDemoComponent implements OnInit {

  @ViewChild('SohoHierarchy') sohoHierarchy: SohoHierarchyComponent;

   public data: Array<any>;
   public legend: Array<SohoHierarchyLegend>;
   public leafTemplate: any;
   public leafTemplateId = 'hierarchyChartTemplate';
   public legendKey = 'EmploymentType';

   // Flag to allow the lazy load data to only be used once
   private lazyDataLoaded = false;

   constructor(
    private domSanitizer: DomSanitizer,
    private hierarchyService: HierarchyDemoService,
    private changeDetectorRef: ChangeDetectorRef
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
             <use xlink:href="#icon-caret-up"/>
            </svg>
            <span class="audible">Expand/Collapse</span>
           </button>
         </div>
       </script>
      `;

     this.leafTemplate = this.domSanitizer.bypassSecurityTrustHtml(leafTemplate);

     this.hierarchyService.getHierarchyData().subscribe((data) => {
       this.data = data[0].initialDataSet;
       this.changeDetectorRef.markForCheck();
     });
   }

   onSelected(hierarchyEvent: SohoHierarchyEvent) {
     console.log(hierarchyEvent.data, hierarchyEvent.eventType);

     if (hierarchyEvent.eventType === 'expand' && !this.lazyDataLoaded) {
       this.hierarchyService.getHierarchyData().subscribe((data) => {
         const newData = data[0].lazyDataSet;
         this.sohoHierarchy.add(hierarchyEvent.data.id, this.data, newData);
         this.changeDetectorRef.markForCheck();
         this.lazyDataLoaded = true;
       });
     }
   }

}
