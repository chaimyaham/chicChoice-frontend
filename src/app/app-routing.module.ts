import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/user-dashboard/dashboard/dashboard.component';
import { ListVetementsComponent } from './components/user-dashboard/vetements/list-vetements/list-vetements.component';
import { ListEnsembleComponent } from './components/user-dashboard/ensembles/list-ensemble/list-ensemble.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { AddVetementComponent } from './components/user-dashboard/vetements/add-vetement/add-vetement.component';
import { PlanificationComponent } from './components/user-dashboard/planification/planification.component';
import { UpdatePlanificationComponent } from './components/user-dashboard/planification/update-planification/update-planification.component';
import { AddEnsembleComponent } from './components/user-dashboard/ensembles/add-ensemble/add-ensemble.component';
import { AddPlanificationComponent } from './components/user-dashboard/planification/add-planification/add-planification.component';
import { HomeDashComponent } from './components/user-dashboard/dashboard/home-dash/home-dash.component';
import { FavoriComponent } from './components/user-dashboard/vetements/favori/favori.component';
import { FavoriEnsembleComponent } from './components/user-dashboard/ensembles/favori-ensemble/favori-ensemble.component';
import { UpdateEnsembleComponent } from './components/user-dashboard/ensembles/update-ensemble/update-ensemble.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"login", component:LoginComponent,canActivate: [LoginGuard] },
  {path:"sign-up", component:SignUpComponent,canActivate: [LoginGuard] },
  {path:"dashboard", component:DashboardComponent, canActivate: [AuthGuard],
    children:[
      {path:"vetements", component:ListVetementsComponent},
      {path: "ensembles" , component:ListEnsembleComponent},
      {path: "ensemble/add", component: AddEnsembleComponent},
      {path: "vetement/add" , component:AddVetementComponent},
      {path: "planifications", component:PlanificationComponent},
      {path: "planifications/update/:id",component: UpdatePlanificationComponent},
      {path:"planifications/add",component: AddPlanificationComponent},
      {path:"",component: HomeDashComponent},
      {path:"vetements/favoris",component: FavoriComponent},
      {path:"ensembles/favoris",component:FavoriEnsembleComponent},
      {path:"ensembles/:id",component:UpdateEnsembleComponent}
    

     
      
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
