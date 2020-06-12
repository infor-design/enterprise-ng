import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() { }

  getAvailableTemplates() {
    return of({
      data: [
        {
          'templateId': 419,
          'displayName': 'Check and Test Things',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 167,
          'displayName': 'Test Template for Testing the tests',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 299,
          'displayName': 'Testing Check',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 513,
          'displayName': 'ABCDE Template',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 543,
          'displayName': 'Actv Check',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 496,
          'displayName': 'Add',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 504,
          'displayName': 'Email',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 567,
          'displayName': 'kamal type',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 570,
          'displayName': 'kjtest',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 3908,
          'displayName': 'Merge 1',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        },
        {
          'templateId': 3905,
          'displayName': 'random test',
          'status': 1,
          'activityScope': 1,
          'isIntegrationEnabled': false,
          'isMapped': false
        }
      ] as Array<Asset>,
      'success': true,
      'failures': []
    }).pipe(delay(3000));
  }
}
