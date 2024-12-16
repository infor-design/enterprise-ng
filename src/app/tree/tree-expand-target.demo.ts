import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-tree-expand-target-demo',
    templateUrl: 'tree-expand-target.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TreeExpandTargetDemoComponent implements OnInit {
  @ViewChild(SohoTreeComponent, { static: true }) tree?: SohoTreeComponent;

  private DATA: SohoTreeNode[] = [{
    id: 'node1',
    text: 'Documents',
    icon: 'icon-tree-doc'
  }, {
    id: 'node2',
    text: 'Products',
    open: true,
    icon: 'icon-cloud',
    children: [{
      id: 'node2a',
      text: 'Accessories',
      open: false,
      icon: 'icon-cloud',
      children: [{
        id: 'node2a1',
        text: 'Accessorie1'
      }, {
        id: 'node2a2',
        text: 'Accessorie2'
      }, {
        id: 'node2a3',
        text: 'Accessorie3'
      }, {
        id: 'node2a4',
        text: 'Accessorie4'
      }, {
        id: 'node2a5',
        text: 'Accessorie5'
      }]
    }, {
      id: 'node2b',
      text: 'Bike',
      open: true,
      icon: 'icon-cloud',
      children: [{
        id: 'node2b1',
        text: 'BMX',
        open: false,
        icon: 'icon-cloud',
        children: [{
          id: 'node2b1a',
          text: 'BMX-1'
        }, {
          id: 'node2b1b',
          text: 'BMX-2'
        }]
      }, {
        id: 'node2b2',
        text: 'Foldable',
        open: false,
        icon: 'icon-cloud',
        children: [{
          id: 'node2b2a',
          text: 'Foldable-1'
        }]
      }, {
        id: 'node2b3',
        text: 'Mountain',
        open: false,
        icon: 'icon-cloud',
        children: [{
          id: 'node2b3a',
          text: 'Mountain-1'
        }, {
          id: 'node2b3b',
          text: 'Mountain-2'
        }, {
          id: 'node2b3c',
          text: 'Mountain-3'
        }, {
          id: 'node2b3d',
          text: 'Mountain-4'
        }, {
          id: 'node2b3e',
          text: 'Mountain-5'
        }, {
          id: 'node2b3f',
          text: 'Mountain-6'
        }]
      }, {
        id: 'node2b4',
        text: 'Road',
        open: false,
        children: []
      }]
    }, {
      id: 'node2c',
      text: 'Parts',
      open: false,
      icon: 'icon-cloud',
      children: [{
        id: 'node2c1',
        text: 'Parts-1'
      }, {
        id: 'node2c2',
        text: 'Parts-2'
      }, {
        id: 'node2c3',
        text: 'Parts-3'
      }, {
        id: 'node2c4',
        text: 'Parts-4'
      }, {
        id: 'node2c5',
        text: 'Parts-5'
      }, {
        id: 'node2c6',
        text: 'Parts-6'
      }, {
        id: 'node2c7',
        text: 'Parts-7'
      }, {
        id: 'node2c8',
        text: 'Parts-8'
      }, {
        id: 'node2c9',
        text: 'Parts-9'
      }, {
        id: 'node2c10',
        text: 'Parts-10'
      }, {
        id: 'node2c11',
        text: 'Parts-11'
      }, {
        id: 'node2c12',
        text: 'Parts-12'
      }, {
        id: 'node2c13',
        text: 'Parts-13'
      }, {
        id: 'node2c14',
        text: 'Parts-14'
      }, {
        id: 'node2c15',
        text: 'Parts-15'
      }, {
        id: 'node2c16',
        text: 'Parts-16'
      }, {
        id: 'node2c17',
        text: 'Parts-17'
      }, {
        id: 'node2c18',
        text: 'Parts-18'
      }, {
        id: 'node2c19',
        text: 'Parts-19'
      }, {
        id: 'node2c20',
        text: 'Parts-20'
      }, {
        id: 'node2c21',
        text: 'Parts-21'
      }, {
        id: 'node2c22',
        text: 'Parts-22'
      }, {
        id: 'node2c23',
        text: 'Parts-23'
      }, {
        id: 'node2c24',
        text: 'Parts-24'
      }, {
        id: 'node2c25',
        text: 'Parts-25'
      }, {
        id: 'node2c26',
        text: 'Parts-26'
      }, {
        id: 'node2c27',
        text: 'Parts-27'
      }, {
        id: 'node2c28',
        text: 'Parts-28'
      }, {
        id: 'node2c29',
        text: 'Parts-29'
      }, {
        id: 'node2c30',
        text: 'Parts-30'
      }, {
        id: 'node2c31',
        text: 'Parts-31'
      }, {
        id: 'node2c32',
        text: 'Parts-32'
      }, {
        id: 'node2c33',
        text: 'Parts-33'
      }, {
        id: 'node2c34',
        text: 'Parts-34'
      }, {
        id: 'node2c35',
        text: 'Parts-35'
      }, {
        id: 'node2c36',
        text: 'Parts-36'
      }, {
        id: 'node2c37',
        text: 'Parts-37'
      }, {
        id: 'node2c38',
        text: 'Parts-38'
      }, {
        id: 'node2c39',
        text: 'Parts-39'
      }]
    }]
  }, {
    id: 'node3',
    text: 'Location',
    open: false,
    icon: 'icon-map-pin',
    children: [{
      id: 'node3a',
      text: 'Location-1'
    }, {
      id: 'node3b',
      text: 'Location-2'
    }, {
      id: 'node3c',
      text: 'Location-3'
    }, {
      id: 'node3d',
      text: 'Location-4'
    }, {
      id: 'node3e',
      text: 'Location-5'
    }, {
      id: 'node3f',
      text: 'Location-6'
    }, {
      id: 'node3g',
      text: 'Location-7'
    }, {
      id: 'node3h',
      text: 'Location-8'
    }, {
      id: 'node3i',
      text: 'Location-9'
    }, {
      id: 'node3j',
      text: 'Location-10'
    }]
  }, {
    id: 'node4',
    text: 'Media',
    icon: 'icon-tree-image'
  }];

  private treeOptions: SohoTreeOptions = {
    dataset: this.DATA,
    sortable: true,
    useExpandTarget: true,
    showChildrenCount: true
  };
  private selected?: any | SohoTreeNode;
  private id = 0;

  constructor() {}

  ngOnInit() {
    (this.tree as any).options = this.treeOptions;
  }

  addNode() {
    this.id++;
    this.tree?.addNode({
      id: `new-item-${this.id}`,
      text: `New Item ${this.id}`,
      parent: this.selected ? this.selected.node : null
    });
  }

  removeNode() {
    if (this.selected) {
      this.tree?.removeNode(this.selected.node);
      this.selected = null;
    }
  }

  updateNode() {
    if (this.selected) {
      this.tree?.updateNode({ node: this.selected.node, text: 'Node Updated Text' });
    }
  }

  onSelected(selectedEvt: SohoTreeEvent) {
    this.selected = selectedEvt.data;
    // console.log('Selected Data: ', this.selected);
  }
}
