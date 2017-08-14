import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HierarchyDemoService } from './hierarchy.demo.service';

@Component({
  selector: 'soho-hierarchy-demo',
  templateUrl: './hierarchy.demo.html',
  styleUrls: ['./hierarchy.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HierarchyDemoService]
})
export class HierarchyDemoComponent implements OnInit {

   public data: Array<any>;
   public legend: Array<SohoHierarchyLegend>;
   public leafTemplate: any;
   public leafTemplateId = 'hierarchyChartTemplate';
   public legendKey = 'EmploymentType'

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

           <button class="btn-expand {{displayClass}} btn-icon" type="button">
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
       this.data = data;
       this.changeDetectorRef.markForCheck();
     })
   }

   onSelected(hierarchyEvent: SohoHierarchyEvent) {
     console.log(hierarchyEvent.data, hierarchyEvent.eventType);
   }

}
