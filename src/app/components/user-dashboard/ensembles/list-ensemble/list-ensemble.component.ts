import { Component, OnInit } from '@angular/core';
import { EnsembleResponse } from 'src/app/models/ensemble-response';
import { Page } from 'src/app/models/page';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-ensemble',
  templateUrl: './list-ensemble.component.html',
  styleUrls: ['./list-ensemble.component.css']
})
export class ListEnsembleComponent implements OnInit {
  userId!: string;
  ensemblePage!: Page<EnsembleResponse>;
  errorMsg: string | null = null;
  constructor(private ensembleService:EnsembleService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllEnsembleByUserId();
    
  }
  getAllEnsembleByUserId(){
    this.ensembleService.obtenirEnsemblesCreerParUser(parseInt(this.userId)).subscribe(
      res => {
          console.log(res);
          this.ensemblePage=res;
        },
        erreur=>{
          console.log(erreur);
            this.errorMsg=erreur.error.message
        });
    
  }
  

}
