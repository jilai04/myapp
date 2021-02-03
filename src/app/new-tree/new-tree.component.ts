import { Component, OnInit } from '@angular/core';
import { ITreeOptions, TreeNode} from 'angular-tree-component';
import { ClientData } from '../new/client';
@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.scss']
})
export class NewTreeComponent implements OnInit {
  clientData = ClientData.data;
  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];
  constructor() { 
    this.nodes = [
      {
        name: 'root1',
        children: [
          { name: 'child1' }
        ]
      },
      {
        name: 'root2',
        hasChildren: true
      },
      {
        name: 'root3'
      }
    ];
    console.log(this.clientData)
    console.log(this.nodes)
  }
  nodes: any[] = [];
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true
  };
  getChildren(node: any) {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));
    console.log(newNodes)

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }
  ngOnInit(): void {
  }

}
