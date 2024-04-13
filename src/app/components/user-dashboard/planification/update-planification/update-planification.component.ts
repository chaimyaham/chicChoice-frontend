import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  planification!:Planification;
  ensemblesPlan : any[]=[];
  constructor(
    private route: ActivatedRoute,
    private planicationSevice: PlanificationService,
    private ensembleService: EnsembleService,
    private mediaService: MediaService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    
  ) {}

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id !== null) {
      this.planificationId = +id;
        this.planicationSevice.getPlanificationById(this.planificationId).subscribe(
          planification => {
          
            console.log(planification)
            this.planification=planification;
            this.getEnsemblesOfPlanification()
            this.planningForm.patchValue({
              dateDebut: planification.dateDebut.toString().slice(0, 10), 
              dateFin: planification.dateFin.toString().slice(0, 10),
              description: planification.description,
              heureDebut: planification.dateDebut.toString().slice(11, 16),
              heureFin: planification.dateFin.toString().slice(11, 16),
            });

      },error=>{
        console.log(error)
      });
    }
    this.userId=this.tokenService.getUserID();
    this.getAllEnsembleByUserId();
    this.planningForm = this.formBuilder.group({
      dateDebut: [''], 
      heureDebut: [''], 
      dateFin: [''], 
      heureFin: [''], 
      description: [''],
    });
    
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
  getEnsemblesOfPlanification(){
    
    this.planification.ensemblesIds.forEach((ensembleId: number) => {
      console.log(ensembleId)
      this.ensembleService.getEnsembleById(ensembleId).subscribe(
        (response: any) => {
          this.ensemblesPlan.push(response);
          console.log("Details de l'ensemble:", response);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de l'ensemble:",
            error
          );
        }
      );
    });
  }
  selectEnsemble(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
        const value = target.value;
       console.log("selectEnsemble",value)
    }
}
}
