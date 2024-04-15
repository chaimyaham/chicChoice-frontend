import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { VetementResponse } from 'src/app/models/vetement-response';
import { TokenService } from 'src/app/services/token.service';
import { VetementService } from 'src/app/services/vetement/vetement.service';

@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})
export class FavoriComponent implements OnInit {

  userId!:string
  vetmentPage!:  Page<VetementResponse>
  errorMsg:string| null =null;
  currentPage : number = 0;
  constructor(private vetementService:VetementService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllVetements(this.currentPage);
  }
  getAllVetements(page : number){
    this.vetementService.getVetementsFavorisByUserId(parseInt(this.userId),page, 4).subscribe(
      (data:Page<VetementResponse>) => {
        console.log(data);
        this.vetmentPage=data;
      },
      error => {
        console.log(error);
       this.errorMsg=error.error.message
      }
    );
  }
  nextPage() {
    if (this.currentPage < this.vetmentPage.totalPages - 1) {
      this.currentPage++;
      this.getAllVetements(this.currentPage);
    }
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.getAllVetements(this.currentPage);
  }
}

confirmDelete(itemId: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
    this.onDeleteItem(itemId);
  } else {
    return
  }
}
onDeleteItem(itemId:number){
  this.vetementService.deleteVetementById(itemId).subscribe(
    response => {
      console.log(response);
      this.getAllVetements(this.currentPage);
    },
    error => {
      console.log(error);
      this.errorMsg="couldn't delete the item";
    }
  );
}
onVetementUpdated(): void {
 this.getAllVetements(this.currentPage)
}

}
