import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoTagComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tag-demo',
  templateUrl: 'tag.demo.html'
})
export class TagDemoComponent implements OnInit {
  @ViewChild(SohoTagComponent, { static: true }) tag?: SohoTagComponent;

  constructor() {
  }

  ngOnInit() {
    // TODO
    console.log(this.tag?.settings);
  }

  afterRemove(e: any) {
    alert(`afterRemove ${e.tag.settings.content}`);
  }

  beforeRemove(e: any) {
    alert(`beforeRemove ${e.tag.settings.content}`);
  }

  beforeRemoveSolo(e: any) {
    alert(`beforeRemove (solo) ${e.tag.settings.content}`);
  }

  onClick(e: any) {
    alert(`Clicked`);
  }
}
