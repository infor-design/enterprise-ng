import {
  Component,
  ElementRef,
  ViewChild,
  NgZone,
  ChangeDetectionStrategy,
  ViewChildren,
  OnInit,
  QueryList
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tree-content-demo',
  templateUrl: 'tree-content.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeContentDemoComponent implements OnInit {
  @ViewChild(SohoTreeComponent, { static: true }) tree: SohoTreeComponent;
  @ViewChildren('treeContextMenu') treeContextMenu: QueryList<any>;

  treeOptions: SohoTreeOptions = {
    folderIconOpen: 'plusminus-folder-open',
    folderIconClosed: 'plusminus-folder-closed',
    menuId: 'treeContextPopupMenu',
    hideCheckboxes: true
  };
  enabled = true;
  selected: SohoTreeNode;
  contextMenuOptions = [];
  options1 = [
    {
      'id': 'PISumOfMathFunctionBtn',
      'name': 'sum_of',
      'functionname': 'sum',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PIAverageOfMathFunctionBtn',
      'name': 'avg_of',
      'functionname': 'avg',
      'action': 'AddMathFuntion'

    },
    {
      'id': 'PIMaximumOfMathFunctionBtn',
      'name': 'max_of',
      'functionname': 'max',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PICountOfMathFunctionBtn',
      'name': 'count_of',
      'functionname': 'count',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PIMinimumOfMathFunctionBtn',
      'name': 'min_of',
      'functionname': 'min',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PIAbsoluteOfMathFunctionBtn',
      'name': 'abs_of',
      'functionname': 'abs',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PIVarianceOfMathFunctionBtn',
      'name': 'var_of',
      'functionname': 'var',
      'action': 'AddMathFuntion'
    },
    {
      'id': 'PIDateDifferenceOfMathFunctionBtn',
      'name': 'datediff_of',
      'functionname': 'datediff',
      'action': 'AddDateDiffMathFuntion'
    },
    {
      'id': 'PIAdditionOperBtn',
      'name': 'addition_operator',
      'functionname': 'plus',
      'action': 'AddMathOperator'
    },
    {
      'id': 'PISubtractionOperBtn',
      'name': 'subtraction_operator',
      'functionname': 'minus',
      'action': 'AddMathOperator'
    },
    {
      'id': 'PIMultiplicationOperBtn',
      'name': 'multiplication_operator',
      'functionname': 'multiply',
      'action': 'AddMathOperator'
    },
    {
      'id': 'PIDivisionOperBtn',
      'name': 'division_operator',
      'functionname': 'divide',
      'action': 'AddMathOperator'
    },
    {
      'id': 'PIModuloOperBtn',
      'name': 'modulo_operator',
      'functionname': 'modulo',
      'action': 'AddMathOperator'
    },
    {
      'id': 'PIBracketsBtn',
      'name': 'add brackets',
      'functionname': 'brackets',
      'action': 'AddBrackets'
    },
    {
      'id': 'PIOpenBracketBtn',
      'name': 'open_bracket',
      'functionname': 'open brackets',
      'action': 'AddOpenBracket'
    },
    {
      'id': 'PICloseBracketBtn',
      'name': 'close_bracket',
      'functionname': 'Close brackets',
      'action': 'AddCloseBracket'
    },
    {
      'id': 'PIValueMoveUpBtn',
      'name': 'move_up',
      'functionname': 'Move Up',
      'action': 'MoveNodeUp'
    },
    {
      'id': 'PIValueMoveDownBtn',
      'name': 'move_down',
      'functionname': 'Move down',
      'action': 'MoveNodeDown'
    },
    {
      'id': 'PIRemoveValueBtn',
      'name': 'remove_this_condition',
      'functionname': 'Remove Condition',
      'action': 'RemoveNode'
    },
    {
      'id': 'PISumOfMathFunctionBtn',
      'name': 'sum_of',
      'functionname': 'sum',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIAverageOfMathFunctionBtn',
      'name': 'avg_of',
      'functionname': 'avg',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIMaximumOfMathFunctionBtn',
      'name': 'max_of',
      'functionname': 'max',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PICountOfMathFunctionBtn',
      'name': 'count_of',
      'functionname': 'count',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIMinimumOfMathFunctionBtn',
      'name': 'min_of',
      'functionname': 'min',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIAbsoluteOfMathFunctionBtn',
      'name': 'abs_of',
      'functionname': 'abs',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIVarianceOfMathFunctionBtn',
      'name': 'var_of',
      'functionname': 'var',
      'action': 'ReplaceMathFuntion'
    },
    {
      'id': 'PIDateDifferenceOfMathFunctionBtn',
      'name': 'datediff_of',
      'functionname': 'datediff',
      'action': 'AddDateDiffMathFuntion'
    }
  ];
  options2 = [
    {
      'id': 'id_NoOperation',
      'name': 'No Operations available',
      'action': 'Nothing'
    }
  ];

  constructor(private element: ElementRef, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.tree.options = this.treeOptions;
  }

  expandAll() {
    this.tree.expandAll();
  }

  collapseAll() {
    this.tree.collapseAll();
  }

  onMenuOpen(e) {
    console.log('menu-open', e);
  }

  onContextMenu(e) {
    console.log('contextmenu', e);
    this.ngZone.runOutsideAngular(() => {
      if (this.contextMenuOptions.length === this.options1.length) {
        this.contextMenuOptions = this.options2;
      } else {
        this.contextMenuOptions = this.options1;
      }
    });
  }

  onMenuSelected(treeEvent: SohoTreeEvent) {
    const cmd = (treeEvent as any).item[0].getAttribute('data-cmd');
    console.log(`You selected command: ${cmd}`);
  }

  toggleEnabled(event: any) {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.tree.enable();
    } else {
      this.tree.disable();
    }
  }

  selectRoot() {
    this.tree.selectNode('home');
  }

  enable() {
    this.tree.enable();
  }

  disable() {
    this.tree.disable();
  }

  addNode() {
    const tn: SohoTreeNode = { text: 'New Item 1.2', disabled: false };
    this.tree.addNode(tn, this.selected);
  }

  onSelected(treeEvent: SohoTreeEvent) {
    this.selected = treeEvent.data;
    console.log('Tree Event: ${this.selected}');
  }

}
