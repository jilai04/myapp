import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './heroes/mock-hero';
import { Observable, of, BehaviorSubject, Subject} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  isSubject = new BehaviorSubject(false);
  shareData: Subject<string> = new Subject<string>();
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: id is ${id}`);
    return of(HEROES.find(res => res.id === id));
  }

  getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/todos').pipe().subscribe((res: any) => {
      console.log(res);
    });
  }

  sendData(value: any){
    this.shareData.next(value);
  }

  getData2(){
    return this.shareData.asObservable();
  }
}
