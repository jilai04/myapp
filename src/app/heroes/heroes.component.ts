import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { from, timer, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  heroesKey: any = 'test heroesKey';
  testdata: any;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    // // this.heroService.getData();
    // const obj$ = from([1, 2, 3, 4]);
    // obj$.pipe(map( x => x + 1)).subscribe((res: any) => {
    //   console.log(res);
    // });

    this.testdata = this.heroService.sendData('okok');
  }
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(res => {
      this.heroes = res;
    });
  }
  handleClick() {
    this.heroesKey = 'test1123';
  }

  change(event){
    console.log(event);
  }
  ngDoCheck() {
    console.log('ngDoCheck is run');
  }
}
