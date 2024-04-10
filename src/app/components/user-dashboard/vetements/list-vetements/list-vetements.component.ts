import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { VetementResponse } from 'src/app/models/vetement-response';
import { TokenService } from 'src/app/services/token.service';
import { VetementService } from 'src/app/services/vetement/vetement.service';

@Component({
  selector: 'app-list-vetements',
  templateUrl: './list-vetements.component.html',
  styleUrls: ['./list-vetements.component.css']
})
export class ListVetementsComponent implements OnInit {
  userId!:string
  constructor(private vetementService:VetementService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllVetements();
  }
  getAllVetements(){
    this.vetementService.getAllVetementsByUserId(parseInt(this.userId),0, 10).subscribe(
      (data:Page<VetementResponse>) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
