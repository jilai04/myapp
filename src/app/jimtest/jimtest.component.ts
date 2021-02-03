import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jimtest',
  templateUrl: './jimtest.component.html',
  styleUrls: ['./jimtest.component.scss']
})
export class JimtestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('111');
  }

}
