import { Component, OnInit } from '@angular/core';
import { CalendarView ,CalendarEvent} from 'angular-calendar';
import { isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {
viewDate : Date=new Date();
view : CalendarView = CalendarView.Week
CalendarView  = CalendarView;
events:CalendarEvent[]=[];
activeDayIsOpen : boolean = false;
refresh = new Subject<void>();

  constructor() { 

  
  }

 
  ngOnInit(): void {
    console.log(this.events);
    const event1 ={
      title: 'Event 1',
      start: new Date("2024-04-12T10:30"),
      end: new Date("2024-04-12T17:30"),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    }
    this.events.push(event1);
  }
setView(view: CalendarView): void {
  this.view = view;
}
dayClicked({date, events} : {date : Date ; events:CalendarEvent[]}):void{
  if(isSameMonth(date, this.viewDate)){
    if(
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0
    ){
      this.activeDayIsOpen = false;
    }else {
      this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }
  
}
eventClicked(event:any) {
  console.log(event);
}
eventTimesChanged(event:any) {
  console.log(event);
  event.event.start =event.newStart;
  event.event.end =event.newEnd;
  this.refresh.next();
}
}
