import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}]
})

export class TreeComponent implements OnInit {
  constructor( private http: HttpClient) {
  }
  newArr: any = [];

  flag: Boolean = false;
  flag2 = false;
  private url = 'http://jsonplaceholder.typicode.com/posts';

  departs = [
    {name: '全选', checked: false},
    {name: '张三', checked: false},
    {name: '李四', checked: false},
    {name: '王五', checked: false}
  ];
  arr = ['张三', '李四', '王五'];
  arrlist: string[] = [];

  ngOnInit(): void {
  }

checkEvent(item, i){

      if (i === 0){ // 如果点击的是第一个全选按钮，就实现全选取消全选
          if (item.checked){
              this.departs.forEach(m => {m.checked = true; });
          }else{
              this.departs.forEach(m => {m.checked = false; });
          }
      }else{
          const res = this.departs.some(m => !m.checked);
          if (res){ // 如果全选以后，其中一个或多个取消选择，就把第一个全选按钮取消勾选
              this.departs[0].checked = false;
          }
          let flag = true;
          for (let n = 1; n < this.departs.length; n++){
              if (!this.departs[n].checked){
                  flag = false;
              }
          }
          if (flag){  // 如果全选以后，其他的全部选中了，就把全选按钮也选中
              this.departs[0].checked = true;
          }
      }
  }

  // clickList(){
  //   this.flag = !this.flag;
  //   console.log(this.flag);
  // }

  // showArr(){
  //   if (!this.flag2){
  //     this.arrlist = this.arr;
  //     this.flag2 = !this.flag2;
  //     console.log(this.flag2);
  //   }else{
  //     this.arrlist = [];
  //     this.flag2 = !this.flag2;
  //     console.log(this.flag2);
  //   }
  //   console.log(this.arrlist);
  // }

  // handleData(){
  //   this.http.get(this.url).subscribe(res => {
  //     console.log(res);
  //     this.newArr =  res;
  //     console.log(this.newArr.splice(1, 10));
  //     this.newArr = this.newArr.splice(1, 10);
  //     return this.newArr;
  //   });
  // }
  //  clickTest(check: boolean){
  //     console.log(check)
  //  }
}
