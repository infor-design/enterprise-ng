export class TreeDemoData {

  private id = 2;

  private ROOT_NODE: SohoTreeNode = {
    'id': 'Root ' + this.id++,
    'text': 'Node 1',
    'children': []
    };

  getRootTreeNodes(): SohoTreeNode[] {
    return [this.ROOT_NODE];
  }

  getTreeNodes(node: SohoTreeNode): SohoTreeNode[] {
    return [{
      'id': node.id + '/1',
      'text': 'Leaf ' + this.id++
    },
    {
      'id': node.id + '/2',
      'text': 'Node ' + this.id++,
      'children': []
    },
    {
      'id': node.id + '/3',
      'text': 'Node ' + this.id++,
      'children': []
    }];
  }
}
