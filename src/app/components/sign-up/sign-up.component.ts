import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { VirtualTimeScheduler } from 'rxjs';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { State } from 'src/app/models/state';
import { AuthService } from 'src/app/services/auth.service';
import { CountrystatecityService } from 'src/app/services/countrystatecity.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  listcountry!: Country[]
  countrySelected!: string
  listState!: State[]
  selectedState!: string
  listCity!: City[] ;
  selectedCity!: string;
  registerForm!: FormGroup;
  countryIso!:string;
  stateIso!:string;
  submitted = false;
  loading=false;
  errorMessage: string | null = null;
  constructor(private countrystatecityService: CountrystatecityService,
    private formBuilder: FormBuilder,
    private authservice :AuthService,
    private router: Router) { }
    ngOnInit(): void {
      this.fetchCountry();
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        sexe: ['', Validators.required],
        countrySelected: ["", Validators.required],
        selectedState: [""],
        selectedCity: [""],
        preferencesStyle: ['', Validators.required]
      });
    }

  get f() { return this.registerForm.controls; }
  private fetchCountry(){
    this.countrystatecityService.getCountry().subscribe(data=>{
    this.listcountry = data
    })
  
  }
  
  onCountrySelected(event: any){
    this.countryIso= event.target.value;
    const selectedCountry = this.listcountry.find(country => country.iso2 === this.countryIso);
    if(selectedCountry)this.countrySelected=selectedCountry.name;
    if (this.countryIso) {
      this.countrystatecityService.getStateOfSelectedCountry(this.countryIso).subscribe(data => {
        this.listState = data;
        this.listCity=[]
        this.selectedState=''
      });
    }
  }
  onStateSelected(event:any){
    this.stateIso=event.target.value;
  const selectedState=this.listState.find(state=>state.iso2===this.stateIso);
  if(selectedState)this.selectedState=selectedState.name;
  this.countrystatecityService.getCitiesOfSelectedState(this.countryIso, this.stateIso).subscribe(data=>{
    if(data.length==0){
      data.push(selectedState)
      this.listCity=data
    }
    else this.listCity = data
  })
  }
  onSubmit() {
this.submitted=true;
    if (this.registerForm.invalid) {
    
      return;
    }
    this.loading = true;
    this.registerForm.value.countrySelected=this.countrySelected;
    if(this.selectedState)this.registerForm.value.selectedState=this.selectedState;
    else this.registerForm.value.selectedState=this.countrySelected;
    if(this.selectedCity===''){
      if(this.selectedState) this.registerForm.value.selectedCity=this.selectedState;
      else this.registerForm.value.selectedCity=this.countrySelected;
    }
    const user: Utilisateur={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      username: this.registerForm.value.username,
      sexe: this.registerForm.value.sexe,
      role: "USER",
      ville: this.registerForm.value.selectedCity,
      pays: this.registerForm.value.countrySelected,
      preferencesStyle: this.registerForm.value.preferencesStyle
    }
    this.authservice.register(user).subscribe(
      res => {
        
        this.registerForm.reset();
        this.openToast()
        this.loading=false
        this.router.navigate(['/login']);

      },
      err => {
        this.loading=false
        if (err.status === 500 && err.error.code === 'WEB_APPLICATION') {
          this.errorMessage = "Le nom d'utilisateur ou l'adresse e-mail existe déjà. Veuillez vous connecter.";
        }else if (err.status === 500 && err.error.error === 'Internal Server Error') {
          this.errorMessage = "Le serveur est indisponible pour le moment. Veuillez réessayer plus tard.";
        } else if (err.status === 503) {
          this.errorMessage = "Une erreur interne du serveur s'est produite. Veuillez réessayer plus tard.";
        } 
      }
    )

    
  
   
  }
  openToast() {         
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Success!!');
    newToastNotification.setMessage('compte creer avec succes.');
    newToastNotification.setConfig({      
      layoutType: DialogLayoutDisplay.SUCCESS,
     });
    newToastNotification.openToastNotification$();
   }

}
