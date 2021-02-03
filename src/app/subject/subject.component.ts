import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  constructor(private _subjectservice: SubjectService) {
  }
  ngOnInit(): void {
    this._subjectservice.flag.subscribe(res => {
      if(res){
        console.log('Subject Component is Clicked!');
      }
   });
  }

  handleClick() {


    this._subjectservice.flag.next(true);
  }
}
