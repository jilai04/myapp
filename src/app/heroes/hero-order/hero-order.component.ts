import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-hero-order',
  templateUrl: './hero-order.component.html',
  styleUrls: ['./hero-order.component.scss']
})
export class HeroOrderComponent implements OnInit {
  @Input() testKey: any;
  @Output() output = new EventEmitter();
  subscription: any;
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.output.emit('output message');
    this.subscription = this.heroService.getData2().subscribe(val => {
      console.log(val);
    });
    console.log(this.subscription);
  }


  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }
}
