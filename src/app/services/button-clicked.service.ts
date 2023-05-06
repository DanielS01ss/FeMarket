import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonClickedService {

  private btnClickedSubject = new BehaviorSubject<number>(0);
  public btnClicked$ = this.btnClickedSubject.asObservable();
  constructor() { }

  public updateClicked(newBtnClicked:number):void{
    this.btnClickedSubject.next(newBtnClicked);
  }

  public getData():number{
    return this.btnClickedSubject.value;
  }
}
