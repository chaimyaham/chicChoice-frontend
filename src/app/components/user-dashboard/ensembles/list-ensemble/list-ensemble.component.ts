import { Component, OnInit } from '@angular/core';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-ensemble',
  templateUrl: './list-ensemble.component.html',
  styleUrls: ['./list-ensemble.component.css']
})
export class ListEnsembleComponent implements OnInit {
  userId!: string;
  constructor(private ensembleService:EnsembleService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllEnsembleByUserId();
    
  }
  getAllEnsembleByUserId(){
    this.ensembleService.obtenirEnsemblesCreerParUser(parseInt(this.userId)).subscribe(res => {
          console.log(res);
        });
    
  }

}
