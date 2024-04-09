import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { State } from 'src/app/models/state';
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
  constructor(private countrystatecityService: CountrystatecityService,private formBuilder: FormBuilder) { }
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
    console.log('Countries fetched', this.listcountry)
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
        console.log('States Retrieved', this.listState);
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
    console.log('Cities retrieved', this.listCity)
  })
  }
  onSubmit() {
this.submitted=true;
    if (this.registerForm.invalid) {
    
      return;
    }
    this.registerForm.value.countrySelected=this.countrySelected;
    if(this.selectedState)this.registerForm.value.selectedState=this.selectedState;
    else this.registerForm.value.selectedState=this.countrySelected;
    if(this.selectedCity===''){
      if(this.selectedState) this.registerForm.value.selectedCity=this.selectedState;
      else this.registerForm.value.selectedCity=this.countrySelected;
    }

    
    console.log(this.registerForm.value);
   
  }

}
