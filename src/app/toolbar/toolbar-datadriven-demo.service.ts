import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarDataDrivenDemoService {

  public getToolbarData(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
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
