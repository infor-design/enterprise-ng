import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SohoDataGridComponent } from 'ids-enterprise-ng';

enum MessageStatus {
  Queued = 'Queued',
  Running = 'Running',
  Success = 'Success',
  Error = 'Error',
  Info = 'Info'
}

@Component({
  selector: 'app-datagrid-tab-demo',
  templateUrl: 'datagrid-tab.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridTabDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid: SohoDataGridComponent;

  public dataset = [
    {
      guid: '1c8826cb-06f5-4115-9a67-68ad35546e6d',
      actionName: 'Create Tenant',
      message: 'Tenant created successfully.',
      sequence: 0,
      server: 'UKFANTHARPER01',
      status: 'Success',
      lastChangeDateTime: '2019-09-12T14:29:58.74Z',
      lastChangeUserId: 'landlord',
      createdDateTime: '0001-01-01T00:00:00Z',
      expanded: false
    },
    {
      guid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c',
      actionName: 'Provision Tenant',
      message: 'Provisioning succeeded for \'INFOR_DEV\'.',
      sequence: 0,
      server: 'UKFANTHARPER01',
      status: 'Success', children:
        [{
          guid: '89058364-3448-4655-acea-17d6f9a393f3',
          actionName: 'Domain: Create database',
          message: '',
          sequence: 1,
          server: 'UKFANTHARPER01',
          status: 'Success',
          parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c',
          lastChangeDateTime: '2019-09-12T14:30:04.267Z',
          lastChangeUserId: 'landlord',
          createdDateTime: '0001-01-01T00:00:00Z',
          expanded: false
        },
        {
          guid: 'fbaa7179-eb4c-4e24-a1fe-25af734a9c66',
          actionName: 'Domain: Add logins to SQL Server',
          message: '',
          sequence: 2,
          server: 'UKFANTHARPER01',
          status: 'Success',
          parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c',
          lastChangeDateTime: '2019-09-12T14: 30: 04.34Z',
          lastChangeUserId: 'landlord',
          createdDateTime: '0001-01-01T00: 00: 00Z',
          expanded: false
        },
        {
          guid: '39cc0787-04d7-4039-a96c-f2a6c8cd97eb',
          actionName: 'Domain: Enable broker',
          message: '',
          sequence: 3,
          server: 'UKFANTHARPER01',
          status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c',
          lastChangeDateTime: '2019-09-12T14: 30: 04.41Z',
          lastChangeUserId: 'landlord',
          createdDateTime: '0001-01-01T00: 00: 00Z',
          expanded: false
        },
        {
          guid: '81487b3a-1c33-4047-a209-58be9e720d31',
          actionName: 'Domain: Set compatibility level',
          message: '',
          sequence: 4,
          server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c',
          /* eslint-disable max-len */
          lastChangeDateTime: '2019-09-12T14: 30: 04.49Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false
        },
        { guid: '4062c504-12d2-4546-b80d-66e351df65f4', actionName: 'Domain: Object existence checks ', message: '', sequence: 5, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 04.577Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '2b1e8eea-76a6-4ca9-bd7e-c053c2763397', actionName: 'Domain: Generate schema', message: '', sequence: 6, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 12.497Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'd2d0419f-20bc-49e8-b3f5-64b5188cd105', actionName: 'Domain: Update metadata', message: '', sequence: 7, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 19.163Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'afb6a937-065a-4c88-b551-6c1f33548a1c', actionName: 'Domain: Remove old dictionary tables', message: '', sequence: 8, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 19.517Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '969faa7e-3635-4759-95e0-6cfd0c1c7065', actionName: 'Domain: Rename data dictionary tables', message: '', sequence: 9, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 19.753Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '004bb36a-b607-42e3-976a-625162b5344e', actionName: 'Domain: Drop old constraints', message: '', sequence: 10, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 19.91Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '79baf874-5fa1-4ee1-a26a-f963cbb542bd', actionName: 'Domain: Create new dictionary tables', message: '', sequence: 11, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 20.06Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '9dcd8397-61db-426a-b830-738e25192c50', actionName: 'Domain: Add data dictionary constraints', message: '', sequence: 12, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 20.293Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '5ec7d9d5-9216-4056-8291-238474b5902a', actionName: 'Domain: Load data dictionary tables', message: '', sequence: 13, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 25.227Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '6dec8b10-1f3f-481a-856d-90e9387737bf', actionName: 'Domain: Install language metadata', message: '', sequence: 14, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 27.137Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '9fdba455-44c5-497a-a955-dd0ad8505e5a', actionName: 'Domain: Update base language metadata', message: '', sequence: 15, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 29.143Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'fd5fed0f-0b06-4b7b-b275-5902fd4619c0', actionName: 'Domain: Update language metadata', message: '', sequence: 16, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 31.773Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '49a119e5-2a29-432a-bd8b-13cb99ad7a8a', actionName: 'Domain: Load data dictionary language tables', message: '', sequence: 17, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 33.077Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '679180ab-23af-47b7-989b-5702056328d6', actionName: 'Domain: Copy forward third party data', message: '', sequence: 18, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 33.323Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '6b1e9848-4ca5-4abf-bc1d-d2e8d0eae7aa', actionName: 'Domain: Add data dictionary indexes', message: '', sequence: 19, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 36.847Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '56fa3f0e-2ea5-47e0-8bb0-ab79977cfccc', actionName: 'Domain: Remove old dictionary tables', message: '', sequence: 20, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 37.203Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'e7680ed8-eadd-474d-aef6-041b7c0c9f93', actionName: 'Domain: Disable SSC hierarchy nodes', message: '', sequence: 21, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 37.26Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'ef9acc34-8f0b-4c9a-bba6-00d334978187', actionName: 'Domain: Create generated data dictionary', message: '', sequence: 22, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 43.827Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '60129640-eca3-4a76-8d87-20e2c9c959db', actionName: 'Domain: Create DOMN_GEN_DATA triggers', message: '', sequence: 23, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 43.89Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '98a985f2-38e4-4923-a56c-32d1cc83166e', actionName: 'Domain: Prepare database access', message: '', sequence: 24, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 44.197Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '4097aa5a-c428-446c-8708-7b4c089ebbb1', actionName: 'Domain: Finalise Domain data', message: '', sequence: 25, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 30: 44.253Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '681abe8c-0a64-48b6-a738-913733454096', actionName: 'Domain: Forms Load', message: '', sequence: 26, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 31: 49.9Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '6bf6ce9f-a450-4099-af12-5195c89ab82a', actionName: 'SunSystems: Create SUN views to domain tables', message: '', sequence: 27, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 31: 50.08Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: 'f2fc0a25-0a27-4108-bcd5-17676b57d7dc', actionName: 'SunSystems: Create GS views to domain tables', message: '', sequence: 28, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 31: 50.173Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '6ec99fcb-689a-4d61-bd13-ebde0eaa9262', actionName: 'SunSystems: Generate schema', message: '', sequence: 29, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 31: 55.293Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '80790f3c-30f1-440e-95b8-4bf3b7c61fef', actionName: 'SunSystems: Update stored procedures', message: '', sequence: 30, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14: 31: 57.933Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00: 00: 00Z', expanded: false }, { guid: '81c03a1a-5a1d-4043-865b-eb108a84fa56', actionName: 'SunSystems: Install Business Unit PK1, apply \'BUSINSTALL.INI\'', message: '', sequence: 31, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:32:13Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '6a2813fa-3259-4d9f-a414-2c5b1a58040b', actionName: 'SunSystems: load PK1 Demo data', message: '', sequence: 32, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:09.747Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '391efdda-66b7-449c-92e9-678607132846', actionName: 'SunSystems: Add PK1 PMD system data ', message: '', sequence: 33, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:09.857Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '5054a3a0-9055-46e7-986a-f4ea662c11a3', actionName: 'Domain:Execute Procedure SSP_PK1_DOC_FMT_ADD ', message: '', sequence: 34, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:10.083Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '1ee116f9-b9cf-49ff-9ebb-da45f65ca7b4', actionName: 'SunSystems: Add PK1 default data ', message: '', sequence: 35, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:10.347Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '4520d3a6-2e9b-4bf8-bde0-28e41281a010', actionName: 'SunSystems: Update SunSystems Business Unit, apply \'BUSUPDATE.INI\'', message: '', sequence: 36, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:27.43Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '40eff627-e943-400d-8416-4cb8dbc0ccde', actionName: 'SunSystems: Post upgrade BU tasks, apply \'BUS_POST_UPGRADE.INI\'', message: '', sequence: 37, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:27.847Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: 'e9230906-409e-4c9e-b574-eb5347c55ed9', actionName: 'SunSystems: Create GS views to domain tables', message: '', sequence: 38, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:27.91Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '542611d1-0899-4f97-8f03-8235f2303a18', actionName: 'SunSystems: Add \'Data\' to domain', message: '', sequence: 39, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:28.75Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: 'bb6ebaec-93ee-42c1-9640-db6ec6914dc9', actionName: 'SunSystems: Load integration data', message: '', sequence: 40, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:29.093Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '57312bfb-ae0d-493f-ac04-95191dd64a03', actionName: 'SunSystems: Update system base language', message: '', sequence: 41, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:30.997Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '7aca8e00-2b82-45ee-ad5d-4dae9c5784eb', actionName: 'SunSystems: Update business unit base language', message: '', sequence: 42, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:33.017Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '6008cd25-3bb5-409a-8af8-3ae54e4ea5d4', actionName: 'Domain: Configure group user permissions', message: '', sequence: 43, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:33.147Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '4e73a317-8a93-4476-91f7-8f03c55b5ede', actionName: 'Security: Generate schema', message: '', sequence: 44, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:37.627Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '2c2ab2b6-6319-4a68-8db7-8b7ebf23141d', actionName: 'Security: Update procedures', message: '', sequence: 45, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:46.817Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: 'b28987b5-b5bc-4f74-8528-47e9a7cd692d', actionName: 'Security: Update language metadata', message: '', sequence: 46, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:48.73Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: '270c4ffb-2d16-482a-af3e-34eb3c332891', actionName: 'Security: Create admin user', message: '', sequence: 47, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:49.737Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }, { guid: 'bd07b81f-4624-419f-b0bd-b04cf110e8aa', actionName: 'Security: Import demo data', message: '', sequence: 48, server: 'UKFANTHARPER01', status: 'Success', parentGuid: 'f555267b-4d9a-42ea-aaff-3ee0d0b8220c', lastChangeDateTime: '2019-09-12T14:33:51.6Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false }], lastChangeDateTime: '2019-09-12T14:33:51.63Z', lastChangeUserId: 'landlord', createdDateTime: '0001-01-01T00:00:00Z', expanded: false
    },
    {
      guid: '913535e8-89c8-47eb-805d-35c43c18016a',
      actionName: 'Update Tenant',
      message: '[Update Tenant INFOR333_DEV] status from OFFLINE to ONLINE successfully.',
      sequence: 0,
      server: 'UKFANTHARPER01',
      status: 'Success',
      lastChangeDateTime: '2019-09-12T14:43:57.037Z',
      lastChangeUserId: 'landlord',
      createdDateTime: '0001-01-01T00:00:00Z',
      expanded: true
    }];

  constructor() {
  }

  public columns: SohoDataGridColumn[] = [
    {
      id: 'actionName',
      field: 'actionName',
      name: 'Action',
      formatter: Soho.Formatters.Tree,
      expanded: 'expanded',
      width: 150,
      filterType: 'text'
    },
    {
      id: 'status', name: 'Status', field: 'status', width: 60,
      editor: Soho.Editors.Input,
      formatter: Soho.Formatters.Alert, options: [
        { value: MessageStatus.Info, label: 'Info' },
        { value: MessageStatus.Queued, label: 'Queued' },
        { value: MessageStatus.Running, label: 'Running' },
        { value: MessageStatus.Success, label: 'Success' },
        { value: MessageStatus.Error, label: Soho.Locale.translate('MessageStatusErrorLabel') }
      ],
      ranges: [
        { value: MessageStatus.Info, classes: 'alert', text: 'Info' },
        { value: MessageStatus.Queued, classes: 'new', text: 'Queued' },
        { value: MessageStatus.Running, classes: 'in-progress', text: 'Running' },
        { value: MessageStatus.Success, classes: 'success', text: 'Success' },
        { value: MessageStatus.Error, classes: 'error', text: 'Error' }
      ]
    },
    {
      id: 'server',
      name: 'Server',
      field: 'server',
      width: 90,
      formatter: Soho.Formatters.Text,
      editor: Soho.Editors.Input,
      filterType: 'text'
    },
    {
      id: 'message',
      name: 'Message',
      field: 'message',
      width: 200,
      formatter: Soho.Formatters.Text,
      editor: Soho.Editors.Input,
      filterType: 'text'
    },
    {
      id: 'createdDateTime',
      name: 'Created Date',
      field: 'createdDateTime',
      width: 100,
      filterType: 'date',
      formatter: Soho.Formatters.Date,
      dateFormat: Soho.Locale.calendar().dateFormat.datetime,
      reorderable: true,
      hidden: true
    },
    {
      id: 'lastChangeDateTime',
      name: 'Last Changed Date',
      field: 'lastChangeDateTime',
      width: 100,
      filterType: 'date',
      formatter: Soho.Formatters.Date,
      dateFormat: Soho.Locale.calendar().dateFormat.datetime,
      reorderable: true
    },
    {
      id: 'lastChangeUserId',
      name: 'Change By',
      field: 'lastChangeUserId',
      width: 100,
      filterType: 'text',
      formatter: Soho.Formatters.Text
    },
    {
      id: 'guid',
      name: 'Guid',
      field: 'guid',
      width: 70,
      formatter: Soho.Formatters.Text,
      editor: Soho.Editors.Input,
      filterType: 'text',
      hidden: true
    }

  ];
}
