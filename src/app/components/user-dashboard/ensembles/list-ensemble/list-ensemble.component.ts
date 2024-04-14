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
  currentPage : number = 0;
  constructor(private ensembleService:EnsembleService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllEnsembleByUserId(this.currentPage);
    
  }
  getAllEnsembleByUserId(page:number){
    this.ensembleService.obtenirEnsemblesCreerParUser(parseInt(this.userId),page,5).subscribe(
      res => {
          this.ensemblePage=res;
        },
        erreur=>{
          console.log(erreur);
            this.errorMsg=erreur.error.message
        });
    
  }
  nextPage() {
    if (this.currentPage < this.ensemblePage.totalPages - 1) {
      this.currentPage++;
      this.getAllEnsembleByUserId(this.currentPage);
    }
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.getAllEnsembleByUserId(this.currentPage);
  }
}
  confirmDelete(itemId: number): void {
    if (confirm('Etes vous sure de vouloire supprimer cette ensemble')) {
      this.onDeleteItem(itemId);
    } else {
      return
    }
  }
  onDeleteItem(itemId:number){
  this.ensembleService.supprimerEnsemble(itemId).subscribe(
    data=>{
      console.log("ensemble supprimer avec success");
      this.getAllEnsembleByUserId(this.currentPage);

    },erreur=>{
      console.log(erreur);
      this.errorMsg="couldn't delete the item";
    })

  }
  

}
