import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarDataDrivenDemoService {

  public getToolbarData(): Promise<any> {
    return new Promise((resolve) => {
      const data = {
        data: [
          { 'text': 'item one' },
          { 'text': 'item two' },
          { 'text': 'item three' }
        ]
      };

      resolve(data);
    });
  }
}
