import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { VetementResponse } from 'src/app/models/vetement-response';
import { VetementService } from 'src/app/services/vetement/vetement.service';

@Component({
  selector: 'app-list-vetements',
  templateUrl: './list-vetements.component.html',
  styleUrls: ['./list-vetements.component.css']
})
export class ListVetementsComponent implements OnInit {

  constructor(private vetementService:VetementService) { }

  ngOnInit(): void {
    this.getAllVetements();
  }
  getAllVetements(){
    this.vetementService.getAllVetementsByUserId(22,0, 10).subscribe(
      (data:Page<VetementResponse>) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
