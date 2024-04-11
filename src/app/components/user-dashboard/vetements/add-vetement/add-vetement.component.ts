import { Component, OnInit, ViewChild } from '@angular/core';
import { Couleur } from 'src/app/models/Couleur';
import { CouleurService } from 'src/app/services/couleur/couleur.service';
import { Page } from 'src/app/models/page';
import { VetementService } from 'src/app/services/vetement/vetement.service';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media/media.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenService } from 'src/app/services/token.service';
import { VetementRequest } from 'src/app/models/vetement-request';

@Component({
  selector: 'app-add-vetement',
  templateUrl: './add-vetement.component.html',
  styleUrls: ['./add-vetement.component.css']
})
export class AddVetementComponent implements OnInit {
  couleur! : Page<Couleur>
  errorMsg:string | null =null;
  currentPage : number = 0;
  selectedColor: Couleur | null = null;
  vetementForm!: FormGroup;
  submitted = false;
  userId!:number;
  @ViewChild('vetementFormRef') vetementFormRef!: NgForm;


  constructor(private couleurService:CouleurService , 
    private vetementService: VetementService,
    private router:Router ,
    private mediaService:MediaService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService
    ) { }
  ngOnInit(): void {
    this.getAllColors(this.currentPage);
    this.userId=parseInt(this.tokenService.getUserID());
    this.vetementForm=this.formBuilder.group({
      note: ['', [Validators.required]],
      category: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      media:[null,[Validators.required]]
    })

  }
  getAllColors(page :number){
    this.couleurService.getAllColors(page,14).subscribe(res=>{
          console.log(res);
          this.couleur=res;
        },
        error => {
          console.log(error);
          this.errorMsg=error.error.message
        }
      );
    }
    nextPage() {
      if (this.currentPage < this.couleur.totalPages - 1) {
        this.currentPage++;
        this.getAllColors(this.currentPage);
      }
    }
  
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.getAllColors(this.currentPage);
      }
    }
    selectColor(color: Couleur) {
      this.selectedColor = color;
      console.log(this.selectedColor)
    }
    onFileChange(event:any) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.vetementForm.patchValue({
          media: file
        });
      } else {
        // Handle case when no file is selected
      }
     
    }
    submitForm() {
      this.submitted = true;
      if (this.vetementFormRef) {
        const fakeEvent = new Event('submit');
        this.vetementFormRef.onSubmit(fakeEvent);
      }
    }
    get f() { return this.vetementForm.controls; }
  
    onSubmit(){
      console.log("hello from submit")
      if (!this.selectedColor) {
        console.log("La couleur n'est pas selectionnee.");
        return;
      }
      if (!this.vetementForm.value.media) {
        console.log("Le media n'est pas selectionnee.");
        return;
      }    
      if (this.vetementForm.invalid) {
        return;
      }
      console.log(this.vetementForm.value)
      console.log(this.selectedColor)
      // ajouter media to media db 
      this.mediaService.uploadMedia(this.vetementForm.value.media).subscribe(
        response => {
          console.log(response);
          const couleurId = this.selectedColor ? this.selectedColor.id : 'black';
          const VetementRequest : VetementRequest={
            note:this.vetementForm.value.note,
            marque:this.vetementForm.value.marque,
            category:this.vetementForm.value.category,
            mediaId:response.id,
            userId:this.userId,
            favoris:false,
            couleurId: couleurId
          }

          this.vetementService.createVetement(VetementRequest).subscribe(
            response => {
                          console.log(response);
                          this.router.navigate(['/dashboard/vetements']);
                        },
                        error => {
                          console.log(error);
                          this.errorMsg=error.error.message
                        }
          )
        },
        error => {
          console.log(error);
          this.errorMsg=error.error.message
        }
      );
     
    }
    getMediaUrl(): SafeUrl {
      const mediaUrl = this.vetementForm.value.media ? URL.createObjectURL(this.vetementForm.value.media) : '../../../../../assets/imgs/theme/upload.svg';
      return this.sanitizer.bypassSecurityTrustUrl(mediaUrl);
  }

}
