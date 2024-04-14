import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnsembleRequest } from 'src/app/models/ensemble-request';
import { Media } from 'src/app/models/media';
import { Page } from 'src/app/models/page';
import { VetementResponse } from 'src/app/models/vetement-response';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { MediaService } from 'src/app/services/media/media.service';
import { TokenService } from 'src/app/services/token.service';
import { VetementService } from 'src/app/services/vetement/vetement.service';

@Component({
  selector: 'app-add-ensemble',
  templateUrl: './add-ensemble.component.html',
  styleUrls: ['./add-ensemble.component.css']
})
export class AddEnsembleComponent implements OnInit {
  userId!:string
  vetmentPage!:  Page<VetementResponse>
  errorMsg:string| null =null;
  currentPage : number = 0;
  newEnsemble:any;
  vetementList:any[]=[];
  selectedVetementId: string | undefined;
  mediaDetailsList: Media[] = [];
 ensembleForm!: FormGroup;
 formSubmitted: boolean = false;
  constructor(private vetementService:VetementService,
     private tokenService:TokenService,
     private ensembleService:EnsembleService,
     private mediaService : MediaService,
     private formBuilder: FormBuilder,
     private router:Router

     ) { }

  ngOnInit(): void {
    this.userId=this.tokenService.getUserID();
    this.getAllVetements(this.currentPage);
    this.ensembleForm = this.formBuilder.group({
          nomDeLEnsemble: ['', [Validators.required]],
        });
    const defaultEnsemble:EnsembleRequest={
      nomDeLEnsemble : "En cours de creation",
      utilisateurId : parseInt(this.userId),
      favoris :false
    }
    this.ensembleService.creerUnEnsemble(defaultEnsemble).subscribe(
      data=>{
        console.log("ensemble created");
        this.newEnsemble=data;
      },
      error=>{
        console.log("error creating ensemble")
      
      }
    )
  }
  getAllVetements(page : number){
    this.vetementService.getAllVetementsByUserId(parseInt(this.userId),page, 2).subscribe(
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
selectVetement(event: Event) {
  const target = event.target as HTMLInputElement;
  this.mediaDetailsList=[]
  if (target) {
    this.errorMsg = null;
    this.selectedVetementId = target.value;
    console.log(this.selectedVetementId)
    this.ensembleService.ajouterVetementAEnsemble(this.newEnsemble.id,+this.selectedVetementId).subscribe(
      data=>{
        console.log("vetement added to ensemble");
        data.vetements.forEach((vetement: any) => {
          const mediaId = vetement.mediaId;
          this.mediaService.getMediaById(mediaId).subscribe(
            (mediaDetails: any) => {
              this.mediaDetailsList.push(mediaDetails);
            },
            error => {
              console.error("Erreur lors de la récupération du media:", error);
            }
          );
        });
      },
      error=>{
        console.log("error adding vetement to ensemble")
      
      }
    )


  }
}
onSubmit(): void {
  if (this.ensembleForm.invalid) {
    this.ensembleForm.markAllAsTouched();
    return; 
  }
  this.ensembleService.modifierEnsemble(this.newEnsemble.id, {
    nomDeLEnsemble: this.ensembleForm.value.nomDeLEnsemble,
    utilisateurId: parseInt(this.userId),
    favoris: this.newEnsemble.favoris
  }).subscribe(
    response => {
      console.log(response);
      this.formSubmitted=true;
      this.router.navigate(['/dashboard/ensembles']);
    },
    error => {
      console.log(error);
      this.errorMsg="couldn't modify the ensemble";
    }
  )
}

async ngOnDestroy(): Promise<void> {
  if (!this.formSubmitted && this.newEnsemble && this.newEnsemble.id) {
    const confirmed = confirm("Etes-vous sur de vouloir quitter la creation de l'ensemble?");
    if (confirmed) {
      try {
        await this.ensembleService.supprimerEnsemble(this.newEnsemble.id).toPromise();
      } catch (error) {
        console.log("Erreur lors de la suppression de l'ensemble :", error);
      }
    }
  }
}

}


