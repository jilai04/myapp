import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(private subjectservice: SubjectService,
              private http: HttpClient) { }
  testArr = [];
  ngOnInit(): void {

    this.subjectservice.flag.subscribe(res => {
      if (res){
        console.log(res);
      }
    });


    this.handleArr();

    Promise.race([this.getPromise(3000), this.getPromise(2000000)]).then(data => {
      console.log(data);
    });

    const URL = 'http://httpbin.org/get';
    this.getUrl(URL).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
    // this.subjectservice.flag.next(2);
    // const body = {"pageIndex":1,"pageSize":100,"archive":false,"statusType":"standardPortfolio","standardPortfolio":{"marketId":2,"marketUnitId":11,"clientGroupCd":"CHBCZ0XXX"}}
    // this.http.post('http://localhost:8080/api/contractstatus/getContractStatus',body).subscribe((res: any) => {
    //   this.testArr = res.Items;
    //   console.log(res);
    // })

  }
  getPromise(second) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(second);
      }, second);
    });
  }


  handleArr() {
    let url = 'http://localhost:3000/';
    this.http.get(url).subscribe(data => {
      console.log(data);
    }) 
  }

  getUrl(url) {
    return new Promise((res, rej) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = () => {
        if (req.status === 200) {
          res(req.responseText);
        } else{
          rej(new Error(req.statusText));
        }
      };
      req.onerror = () => {rej(new Error(req.statusText)); };
      req.send();
    });
  }

}
