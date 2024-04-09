import { Component, OnInit } from '@angular/core';
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
  listCity!: City[]

  constructor(private countrystatecityService: CountrystatecityService) { }
  ngOnInit(){
    this.fetchCountry();
  }
  
  private fetchCountry(){
    this.countrystatecityService.getCountry().subscribe(data=>{
    this.listcountry = data
    console.log('Countries fetched', this.listcountry)
    })
  
  }
  
  onCountrySelected(countryIso: any){
    this.countrystatecityService.getStateOfSelectedCountry(countryIso).subscribe(data=>{
      this.listState = data
      console.log('States Retrieved', this.listState)
    })
  }
  onStateSelected(countryparam = this.countrySelected, stateparam = this.selectedState){
  this.countrystatecityService.getCitiesOfSelectedState(countryparam, stateparam).subscribe(data=>{
    this.listCity = data
    console.log('Cities retrieved', this.listCity)
  })
  }

}
