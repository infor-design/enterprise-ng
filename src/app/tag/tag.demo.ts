import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-demo',
  templateUrl: 'tag.demo.html'
})
export class TagDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  afterRemove(e: any) {
    console.info(`afterRemove ${e.tag.settings.content} fired`);
  }

  beforeRemove(e: any) {
    console.info(`beforeRemove ${e.tag.settings.content} fired`);
  }

  beforeRemoveSolo(e: any) {
    console.info(`beforeRemove (solo) ${e.tag.settings.content} fired`);
  }

  onClick(e: any) {
    console.info(`Clicked`);
  }
}
