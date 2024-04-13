import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { EnsembleResponse } from 'src/app/models/ensemble-response';
import { Page } from 'src/app/models/page';
import { Planification } from 'src/app/models/planification';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { MediaService } from 'src/app/services/media/media.service';
import { PlanificationService } from 'src/app/services/planification/planification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-update-planification',
  templateUrl: './update-planification.component.html',
  styleUrls: ['./update-planification.component.css'],
})
export class UpdatePlanificationComponent implements OnInit {
  userId!: string;
  ensemblePage!: Page<EnsembleResponse>;
  errorMsg: string | null = null;
  planificationId!: number;
  planningForm!: FormGroup;
  planification!: Planification;
  ensemblesPlan: any[] = [];
  submitted = false;
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
    if (id !== null) {
      this.planificationId = +id;
      this.getPlanificationById(this.planificationId);
    }
    this.userId = this.tokenService.getUserID();
    this.getAllEnsembleByUserId();
    this.planningForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      heureDebut: [''], 
      dateFin: ['', Validators.required], 
      heureFin: [''],
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
  getPlanificationById(id: number) {
    this.planicationSevice.getPlanificationById(id).subscribe(
      (planification) => {
        console.log(planification);
        this.planification = planification;
        this.getEnsemblesOfPlanification();
        this.planningForm.patchValue({
          dateDebut: planification.dateDebut.toString().slice(0, 10),
          dateFin: planification.dateFin.toString().slice(0, 10),
          description: planification.description,
          heureDebut: planification.dateDebut.toString().slice(11, 16),
          heureFin: planification.dateFin.toString().slice(11, 16),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllEnsembleByUserId() {
    this.ensembleService
      .obtenirEnsemblesCreerParUser(parseInt(this.userId))
      .subscribe(
        (res) => {
          
          this.ensemblePage = res;
        },
        (erreur) => {
          console.log(erreur);
          this.errorMsg = erreur.error.message;
        }
      );
  }
  deleteEnsemble(ensembleId: number) {
    this.planicationSevice
      .supprimerEnsembleDePlanification(this.planificationId, ensembleId)
      .subscribe(
        (res) => {
          this.errorMsg = null;
          this.ensemblesPlan = [];
          this.getPlanificationById(this.planificationId);
        },
        (erreur) => {
          console.log(erreur);
        }
      );
  }

  getEnsemblesOfPlanification() {
    this.planification.ensemblesIds.forEach((ensembleId: number) => {
      console.log(ensembleId);
      this.ensembleService.getEnsembleById(ensembleId).subscribe(
        (response: any) => {
          this.ensemblesPlan.push(response);
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'ensemble:", error);
        }
      );
    });
  }
  selectEnsemble(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.errorMsg = null;
      this.selectedEnsembleId = target.value;
  
    }
  }

  ajouterEnsemble() {
    if (this.selectedEnsembleId) {
    this.planicationSevice
      .ajouterUnEnsembleAUnePlanification(this.planificationId, +this.selectedEnsembleId)
      .subscribe(
        (res) => {
          console.log(res);
          this.errorMsg = null;
          this.ensemblesPlan = [];
          this.getPlanificationById(this.planificationId);
        },
        (erreur) => {
          console.log(erreur.error.message);
          this.errorMsg = erreur.error.message;
        }
      );
  } else {
    console.log("Aucun ensemble selectionne.");
}
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
  console.log("heelllo")
  console.log(this.planningForm.value)

  const debut = new Date(this.planningForm.value.dateDebut + 'T' + this.planningForm.value.heureDebut);
    const fin = new Date(this.planningForm.value.dateFin + 'T' + this.planningForm.value.heureFin);
  const planification  = {
    dateDebut: debut,
    dateFin: fin,
    description: this.planningForm.value.description,
    utilisateurId: +this.userId,
    meteoId: 1,
   
  }
  this.planicationSevice.updatePlanification(planification,this.planificationId).subscribe(
    (res) => {
      this.planningForm.reset();
      this.openToast()
      this.router.navigate(['/dashboard/planifications']);
    },
    (erreur) => {
     console.log(erreur);
    }
  )

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
}
