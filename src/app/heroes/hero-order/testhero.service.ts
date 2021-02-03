import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestheroService {
  listenHero = new Subject();

  constructor() {  this.listenHero.next('listenHero is listened'); }

}
