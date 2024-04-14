
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { EnsembleResponse } from 'src/app/models/ensemble-response';
import { Page } from 'src/app/models/page';
import { Planification } from 'src/app/models/planification';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { PlanificationService } from 'src/app/services/planification/planification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.css']
})
export class AddPlanificationComponent implements OnInit {

  userId!: string;
  ensemblePage!: Page<EnsembleResponse>;
  errorMsg: string | null = null;
  planificationId!: number;
  planningForm!: FormGroup;
  planification!: Planification;
  ensemblesPlan: any[] = [];
  submitted = false;
  selectedEnsembles: number[] = [];
  loading=false;
  currentPage : number = 0;
  @ViewChild('planificationFormRef') planificationFormRef!: NgForm;
  selectedEnsembleId: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private planicationSevice: PlanificationService,
    private ensembleService: EnsembleService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
 
    this.userId = this.tokenService.getUserID();
    this.getAllEnsembleByUserId(this.currentPage);
    this.planningForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      heureDebut: ['00:00'], 
      dateFin: ['', Validators.required], 
      heureFin: ['00:00'],
      description: ['', Validators.required],
    }, {validator: this.dateValidation});
  }
  dateValidation(formGroup: FormGroup) {
    const dateDebut = formGroup.get('dateDebut')?.value;
    const heureDebut = formGroup.get('heureDebut')?.value;
    const dateFin = formGroup.get('dateFin')?.value;
    const heureFin = formGroup.get('heureFin')?.value;
      const debut = new Date(dateDebut + 'T' + heureDebut);
    const fin = new Date(dateFin + 'T' + heureFin);
  
    if (debut && fin && debut > fin) {
      formGroup.get('dateFin')?.setErrors({ invalidDate: true });
      return { invalidDate: true };
    } else {
      if (formGroup.get('dateFin')?.hasError('invalidDate')) {
        formGroup.get('dateFin')?.setErrors(null);
      }
      return null;
    }
  }
  getAllEnsembleByUserId(page:number){
    this.ensembleService.obtenirEnsemblesCreerParUser(parseInt(this.userId),page,4).subscribe(
      res => {
          this.ensemblePage=res;
        },
        erreur=>{
          console.log(erreur);
            this.errorMsg=erreur.error.message
        });
    
  }



submitForm() {
  this.submitted = true;
  if (this.planningForm.valid) { 
    if (this.planificationFormRef) {
      const fakeEvent = new Event('submit');
      this.planificationFormRef.onSubmit(fakeEvent);
    }
  } else {
    console.log("Le formulaire contient des erreurs. Impossible de le soumettre.");
  }
}
onSubmit() {

this.loading=true
  const debut = new Date(this.planningForm.value.dateDebut + 'T' + this.planningForm.value.heureDebut);
    const fin = new Date(this.planningForm.value.dateFin + 'T' + this.planningForm.value.heureFin);
  const planification :Planification  = {
    dateDebut: debut,
    dateFin: fin,
    description: this.planningForm.value.description,
    utilisateurId: +this.userId,
    meteoId: 1,
    ensemblesIds:this.selectedEnsembles
  }
  this.planicationSevice.ajouterPlanification(planification).subscribe(
    (res) => {
      this.planningForm.reset();
      this.openToast()
      this.loading=false
      this.router.navigate(['/dashboard/planifications']);
    },
    (erreur) => {
      this.loading=false
     console.log(erreur);
    }
  )

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
openToast() {         
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle('Success!!');
  newToastNotification.setMessage('planification updated successfully');
  newToastNotification.setConfig({      
    layoutType: DialogLayoutDisplay.SUCCESS,
   });
  newToastNotification.openToastNotification$();
 }
 toggleEnsembleSelection(event: any, ensemble: any) {
  if (event.target.checked) {
    this.selectedEnsembles.push(ensemble.id);
  } else {
    const index = this.selectedEnsembles.indexOf(ensemble.id);
    if (index !== -1) {
      this.selectedEnsembles.splice(index, 1);
    }
  }
  console.log(this.selectedEnsembles);
}
}
