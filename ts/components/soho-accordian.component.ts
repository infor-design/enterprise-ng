
import {Component} from '@angular/core';

@Component({
    selector : 'soho-accordian-component',
    template : `
      <div style="position:relative;padding-left:300px;box-sizing:border-box;height:100%">
          <div style="width:300px;height:100%;position:absolute;top:0px;left:0px;">
          <div *ngFor="let upperStep of options.steps">
             <a href="#"><span>{{upperStep.label}}</span></a>   
          </div>
            
          </div>
	  </div>
	  <div flex style="height:100%">
		<div style="width:100%;height:100%;margin:20px;">
			<div class="stepContent" id="1-1" style="width:100%;height:100%;">1-1 Content</div>
			<div class="stepContent" id="1-2" style="width:100%;height:100%;">1-2 Content</div>
			<div class="stepContent" id="1-3" style="width:100%;height:100%;">1-3 Content</div>
			<div class="stepContent" id="2-1" style="width:100%;height:100%;">2-1 Content</div>
			<div class="stepContent" id="2-2" style="width:100%;height:100%;">2-2 Content</div>
			<div class="stepContent" id="2-3" style="width:100%;height:100%;">2-3 Content</div>
		</div>
	  </div>  
    `
})

export class SohoAccordianComponent
{
    private options:any =
    {
        title: "test title",
        steps:
            [
                {
                    label: "Upper Step 1",
                    action: {},
                    steps:
                        [
                            {label: "Lower Step 1-1", action: {} },
                            {label: "Lower Step 1-2", action: {} },
                            {label: "Lower Step 1-3", action: {} }
                        ]
                },
                {
                    label: "Upper Step 2",
                    action: {},
                    steps:
                        [
                            {label: "Lower Step 2-1", action: {} },
                            {label: "Lower Step 2-2", action: {} },
                            {label: "Lower Step 2-3", action: {} }
                        ]
                }
            ]

    };

    constructor(){}

    public build():void
    {

    }

}