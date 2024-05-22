import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-demo',
  templateUrl: 'tag.demo.html',
})
export class TagDemoComponent {

  afterRemove(e: any) {
    alert(`afterRemove ${e.tag.settings.content}`);
  }

  beforeRemove(e: any) {
    alert(`beforeRemove ${e.tag.settings.content}`);
  }

  beforeRemoveSolo(e: any) {
    console.log('before remove solo');
    alert(`beforeRemove (solo) ${e.tag.settings.content}`);
  }

  onClick(e: any) {
    alert(`Clicked`);
  }
}
