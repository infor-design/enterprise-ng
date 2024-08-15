import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-demo',
  templateUrl: 'tag.demo.html',
})
export class TagDemoComponent implements OnInit {
  ngOnInit() {
  }

  afterRemove(e: any) {
    console.info(`afterRemove ${e.tag.settings.content} fired`);
  }

  beforeRemove(e: any) {
    console.info(`beforeRemove ${e.tag.settings.content} fired`);
  }

  onClick(e: any) {
    console.info(`Clicked ${e.tag.settings.content} fired`);
  }
}
