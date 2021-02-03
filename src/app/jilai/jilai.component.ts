import { Component, OnInit } from '@angular/core';
import { TestheroService } from '../heroes/hero-order/testhero.service';
import * as _ from 'loadsh';
import { Observable, interval, of } from 'rxjs';
import { take, map, filter} from 'rxjs/operators';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-jilai',
  templateUrl: './jilai.component.html',
  styleUrls: ['./jilai.component.scss'],
})
export class JilaiComponent implements OnInit {
  data: any = 'string';
  isFoo = true;
  isSpecial = true;
  classExpr = {foo: true};


  constructor(private testService: TestheroService, private heroService: HeroService) {}

  ngOnInit(): void {
    const ownerArr = [
      {
        owner: 'Colin',
        pets: [{ name: 'dog1' }, { name: 'dog2' }],
      },
      {
        owner: 'John',
        pets: [{ name: 'dog3' }, { name: 'dog4' }],
      },
    ];
    const lodashmap = _.map(ownerArr, 'pets[0]');
    console.log(lodashmap);
    this.testService.listenHero.subscribe({next: value => {
      console.log(value);
    }});

    this.heroService.shareData.subscribe(res => {
      console.log(res);
    })
  }
}
