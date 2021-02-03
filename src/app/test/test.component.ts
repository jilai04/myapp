import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnChanges,ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ClientData } from '../new/client';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';

export class TodoItemNode {
  children: TodoItemNode[];
  checkFlag: boolean;
  item: string;
  id: string;
  type: string;
  parentid: string;
  updFlag: boolean;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  id: string;
  type: string;
  checkFlag: boolean;
  parentid: string;
}

const objData = ClientData.data;

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent {

  get data(): TodoItemNode[] { return this.dataChange.value; }
  constructor(private http: HttpClient) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
      // console.log(this.dataSource.data);
      // console.log('-------OnInit-----------');
    });
  }
  subscribeScroll: any;
  scrollDis: any = {
    _top: 0
  };

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  Data = ClientData.data;
  IncludedArr = [];

  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;
  /** The new item's name */
  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  s: any = [];
  count = 0;
  limit = 10;
  handledArr = [];
  @ViewChild('scroll') scroll: any;
  ngOnInit(): void {
    this.http.get(`http://localhost:8080/api/portfolio/GetClients?portfolioKey=23fee6d5-5fc6-4c40-a561-0800ef08ccbe&limit=${this.limit}&offset=${this.count}`).subscribe((res: any) => {
      if (res){
        // console.log(res);
        this.s = res;
        this.initialize(res);
        this.initTreeData(this.IncludedArr);
        // console.log(this.s);
        // console.log(this.IncludedArr);
      }
    });
    const scroll = document.querySelector('.scroll');
    console.log(scroll)
    console.log(this.scrollDis.nativeElement);
    this.subscribeScroll = fromEvent(scroll, 'scroll').subscribe(e => {
      this.onWindowScroll(scroll);
    });
  }
  scollPostion() {
    let t, l, w, h;
    const scroll = document.querySelector('.scroll');
    if (scroll && scroll.scrollTop) {
        t = scroll.scrollTop;
        l = scroll.scrollLeft;
        w = scroll.scrollWidth;
        h = scroll.scrollHeight;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    };
  }
  onWindowScroll(scroll){
    this.scrollDis._top = this.scollPostion().top;
    const catchHeight = scroll.scrollHeight - scroll.offsetHeight;
    if (catchHeight === this.scrollDis._top){
      this.count = this.count + 1 ;
      console.log('test');
      console.log(`http://localhost:8080/api/portfolio/GetClients?portfolioKey=23fee6d5-5fc6-4c40-a561-0800ef08ccbe&limit=${this.limit}&offset=${this.count * 10}`);
      this.http.get(`http://localhost:8080/api/portfolio/GetClients?portfolioKey=23fee6d5-5fc6-4c40-a561-0800ef08ccbe&limit=${this.limit}&offset=${this.count * 10}`).subscribe((res: any) => {
        if (res){
          // console.log(res);
          this.IncludedArr = [];
          this.handledArr = this.dataSource.data;
          const data = this.buildFileTree(res, 0);
          console.log('handleArr', this.handledArr);
          console.log('data' , data);
          if(this.handledArr[this.handledArr.length - 1]){
            
          }
          const newArr = this.handledArr.concat(data); // new object exist
          console.log(newArr);
          this.dataChange.next(newArr);
          console.log(this.dataSource.data);

          console.log(this.IncludedArr);
          // this.initTreeData(this.IncludedArr);
          // if(res.length < 2){
          //   this.handledArr = this.s.map(el => {
          //     if(el.MasterClientNm === res[0].MasterClientNm){
          //       res[0].Customers.map(child => {
          //        el.Customers.push(child);
          //       })
          //     }
          //     return this.s;
          //   })
          //   console.log(this.s)
          //   console.log(this.handledArr);
          // }
          // const newArr = [...this.s, res[0]];
          // this.IncludedArr = [];
          // this.initialize(newArr);
          // this.initTreeData(this.IncludedArr)
          // console.log(this.IncludedArr);
          // this.s = newArr;
          this.initTreeData(this.IncludedArr);
        }else{
          console.log('no data');
          return;
        }
      });
    }
  }
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    console.log('transformer start');
    const existingNode = this.nestedNodeMap.get(node);
    // const flatNode = existingNode && existingNode.item === node.item
    //   ? existingNode
    //   : new TodoItemFlatNode();
    const flatNode = new TodoItemFlatNode();
    // console.log('node: ', node);
    // console.log('existingNode :',existingNode && existingNode.item === node.item)
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    flatNode.id = node.id;
    flatNode.type = flatNode.level === 0 ? 'MC' : 'FC';
    // console.log('node.updFlag' , node.updFlag);
    flatNode.checkFlag = node.updFlag ? true : false;
    // console.log('flatNode.checkFlag' , flatNode.checkFlag);
    flatNode.parentid = node.parentid ? node.parentid : null;
    // console.log(flatNode);
    this.flatNodeMap.set(flatNode, node);
    // console.log(flatNode);
    this.nestedNodeMap.set(node, flatNode);
    if(node.id === '0010033439'){
      console.log(flatNode);
      console.log(node.parentid);
    }
    this.IncludedArr.push(flatNode);
    console.log('transformer end');
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }



  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
    node.checkFlag = this.checklistSelection.isSelected(node);
    descendants.forEach(ele => {
      ele.checkFlag = node.checkFlag;
    });
    this.dataSource.data.map(s => {
      if (s.children && s.item === node.item) {
        s.updFlag = node.checkFlag;
        s.children.map(c => {
          c.updFlag = node.checkFlag;
          if (c.children) {
            c.children.map(d => {
              d.updFlag = node.checkFlag;
            });
          }
        });
      } else if (s.children) {
        s.children.map(c => {
          if (c.item === node.item) {
            c.updFlag = node.checkFlag;
            if (c.children && c.item === node.item) {
              c.children.map(d => {
                d.updFlag = node.checkFlag;
              });
            }
          }
        });
      }
    });
    // console.log(this.dataSource.data);
    // console.log('-------Select All-----------');
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    node.checkFlag = this.checklistSelection.isSelected(node);
    this.dataSource.data.map(s => {
      if (s.children) {
        s.children.map(c => {
          if (c.item === node.item) {
            c.updFlag = node.checkFlag;
          } else if (c.children) {
            c.children.map(d => {
              if (d.item === node.item) {
                d.updFlag = node.checkFlag;
              }
            });

          }
        });
      }
    });
    // console.log(this.dataSource.data);
    // console.log('-------Select Single-----------');
  }

  save() {
    console.log(this.dataSource.data);

  }
  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);

    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
      node.checkFlag = this.checklistSelection.isSelected(node);
      this.dataSource.data.map(s => {
        if (s.item === node.item) {
          s.updFlag = node.checkFlag;
        } else if (s.children) {
          s.children.map(c => {
            if (c.item === node.item) {
              c.updFlag = node.checkFlag;
            }
          });
        }
      });
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
      node.checkFlag = this.checklistSelection.isSelected(node);
      this.dataSource.data.map(s => {
        if (s.item === node.item) {
          s.updFlag = node.checkFlag;
        } else if (s.children) {
          s.children.map(c => {
            if (c.item === node.item) {
              c.updFlag = node.checkFlag;
            } else if (c.children) {
              c.children.map(d => {
                if (d.item === node.item) {
                  d.updFlag = node.checkFlag;
                }
              });
            }
          });
        }
      });
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  uncheckRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );

    if (nodeSelected || !descAllSelected || !nodeSelected || descAllSelected) {
      this.checklistSelection.deselect(node);
    }
    node.checkFlag = this.checklistSelection.isSelected(node);
    this.dataSource.data.map(s => {
      if (s.item === node.item) {
        s.updFlag = node.checkFlag;
      } else if (s.children) {
        const childArr = s.children;
        childArr.map(c => {
          if (c.item === node.item) {
            c.updFlag = node.checkFlag;
          } else if (c.children) {
            const grdchildArr = c.children;
            grdchildArr.map(d => {
              if (d.item === node.item) {
                d.updFlag = node.checkFlag;
              }
            });
          }
        });
      }
    });
  }

  checkAll() {
    const selectAllArr = this.treeControl.dataNodes;
    selectAllArr.map(s => {
      this.checkRootNodeSelection(s);
      this.checkAllParentsSelection(s);
      s.checkFlag = true;
    });
    // console.log(this.dataSource.data);
  }

  uncheckAll() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      this.uncheckRootNodeSelection(this.treeControl.dataNodes[i]);
    }
    // console.log(this.dataSource.data);
  }

  initialize(client: any) {
    const data = this.buildFileTree(client, 0);
    this.dataChange.next(data);
  }

  buildFileTree(obj, level: number): TodoItemNode[] {
    const newArr: TodoItemNode[] = [];
    obj.forEach(element => {
      const node = new TodoItemNode();
      node.item = element.MasterClientNm;
      node.id = element.MasterClientNbr;
      node.checkFlag = element.CheckFlag;
      node.updFlag = element.CheckFlag;
      level = level + 1;
      if (element.Customers !== null) {
        node.children = this.bulidChildrenTree(element.Customers, level, node.id);
      }
      newArr.push(node);
    });
    return newArr;
  }
  bulidChildrenTree(obj, level: number, parentid: string): TodoItemNode[] {
    const childrenArr: TodoItemNode[] = [];
    obj.forEach(element => {
      const node = new TodoItemNode();
      node.item = element.CustomerNm;
      node.id = element.CustomerNbr;
      node.checkFlag = element.CheckFlag;
      node.parentid = parentid;
      node.updFlag = element.CheckFlag;
      node.children = element.Customers ? this.bulidChildrenTree(element.Customers, level, node.id) : null;
      childrenArr.push(node);
    });
    return childrenArr;
  }

  initTreeData(array: TodoItemFlatNode[]) {
    console.log('initTreeData');
    // console.log(array);
    // console.log(array.length);
    array.map(el => {
      if (el.parentid && el.checkFlag) {
          if (!el.expandable) {// third level grdChild node
            el.checkFlag = !el.checkFlag;
            this.todoLeafItemSelectionToggle(el);
          } else {// second level child node
            el.checkFlag = !el.checkFlag;
            this.todoLeafItemSelectionToggle(el);
          }
      }
    });
  }
}
