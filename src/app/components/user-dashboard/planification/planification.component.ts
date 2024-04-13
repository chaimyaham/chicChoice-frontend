import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CalendarView ,CalendarEvent} from 'angular-calendar';
import { isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { EnsembleResponse } from 'src/app/models/ensemble-response';
import { Page } from 'src/app/models/page';
import { Planification } from 'src/app/models/planification';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { PlanificationService } from 'src/app/services/planification/planification.service';
import { TokenService } from 'src/app/services/token.service';
import { VetementService } from 'src/app/services/vetement/vetement.service';


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
errorMsg : string |null = null;
selectedEvent: any;
ensembleOftheevent:any[]=[];
msg:string | null = null;
@ViewChild('myModal') myModal!: ElementRef;
isModalOpen: boolean = false;

  constructor(private tokenService:TokenService,
    private planificationService:PlanificationService,
    private ensembleService:EnsembleService,
    private vetementService : VetementService) {}

 
  ngOnInit(): void {
    this.setView(CalendarView.Week);
    this.viewDate = new Date();
    const userId = parseInt(this.tokenService.getUserID())
    console.log(this.events);
    console.log(userId)
    this.getAllPlanififcationEvents(userId);
    const event1 ={
      title: 'Event 1',
      start: new Date("2024-04-12T10:30"),
      end: new Date("2024-04-12T17:30"),
    
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta: { image: '../../../../assets/logo-no-background.png' }
      
    }
    const event2 ={
      title: 'Event 2',
      start: new Date("2024-04-13T10:30"),
      end: new Date("2024-04-16T17:30"),
    
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta: { image: '../../../../assets/logo-no-background.png' }
      
    }
    this.events.push(event2);
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
  this.selectedEvent = event;
  this.isModalOpen = true;
  console.log(this.selectedEvent)
if(this.selectedEvent.event.meta.ensemble.length===0)
{
this.msg="Pas d'ensemble ajouter a cette planification"
this.ensembleOftheevent=[];
}else {
  const neArr: any[]=[]
  this.selectedEvent.event.meta.ensemble.forEach((ensembleId: number) => {
    this.ensembleService.getEnsembleById(ensembleId).subscribe(
      (response: any) => {
        neArr.push(response)
        
        console.log("Détails de l'ensemble:", response);
      },
      error => {
        console.error("Erreur lors de la récupération de l'ensemble:", error);
      }
    );
   
  });
  this.ensembleOftheevent=neArr;
  console.log(this.ensembleOftheevent)
}
}
eventTimesChanged(event:any) {
  console.log(event);
  event.event.start =event.newStart;
  event.event.end =event.newEnd;
  this.refresh.next();
}

getAllPlanififcationEvents(userId: number) {
  this.planificationService.getAllPlanififcationByUserId(userId, 0, 10).subscribe(
    (data: Page<Planification>) => {
      console.log(data);
    
      data.content.forEach((planification: Planification) => {
        const event: CalendarEvent = {
          title: planification.description,
          start: new Date(planification.dateDebut),
          end: new Date(planification.dateFin),
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          meta: { 
            id: planification.id,
            ensemble : planification.ensemblesIds
           }
        };
        this.events.push(event);
      });
     
      this.refresh.next();
    },
    erreur => {
      console.log(erreur);
      this.errorMsg = erreur.error.message;
    });
}

closeModal() {
  this.isModalOpen = false;
  console.log("modal-closed")
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  if (this.isModalOpen) {
    const modalContainer = document.querySelector('.custom-modal');
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      this.closeModal();
    }
  }
}

}
