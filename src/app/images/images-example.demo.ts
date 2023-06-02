import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-images-example',
  templateUrl: './images-example.demo.html'
})
export class ImagesExampleDemoComponent {
  @Input() imageSample: string | undefined;

  constructor() {
    this.imageSample = 'https://i.imgur.com/cPTHE5v.png';
  }

  clickImage() {
    alert('this image was clicked!');
  }
}