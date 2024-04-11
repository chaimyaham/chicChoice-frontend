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
  vetmentPage!:  Page<VetementResponse>
  errorMsg:string| null =null;
  currentPage : number = 0;
  constructor(private vetementService:VetementService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllVetements(this.currentPage);
  }
  getAllVetements(page : number){
    this.vetementService.getAllVetementsByUserId(parseInt(this.userId),page, 4).subscribe(
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
        if (this.vetmentPage.content.length > 0) {
            const selectedCategory = (document.getElementById('categoryFilter') as HTMLSelectElement).value;
            if (selectedCategory === "Tout") {
                this.getAllVetements(this.currentPage);
            } else {
                this.getVetementByCategory(selectedCategory, this.currentPage);
            }
        } else {
            this.getAllVetements(this.currentPage);
        }
    }
}

previousPage() {
    if (this.currentPage > 0) {
        this.currentPage--;
        if (this.vetmentPage.content.length > 0) {
            const selectedCategory = (document.getElementById('categoryFilter') as HTMLSelectElement).value;
            if (selectedCategory === "Tout") {
                this.getAllVetements(this.currentPage);
            } else {
                this.getVetementByCategory(selectedCategory, this.currentPage);
            }
        } else {
            this.getAllVetements(this.currentPage);
        }
    }
}
  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    if (selectedCategory=="Tout") {
      this.getAllVetements(this.currentPage);
    }else{
      this.getVetementByCategory(selectedCategory,this.currentPage)
    }
}
getVetementByCategory(category:string,page:number){
  this.vetementService.getVetementsByCategoryAndUser(category,parseInt(this.userId),page, 4).subscribe(
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

}
