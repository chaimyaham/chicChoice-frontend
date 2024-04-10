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

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"login", component:LoginComponent,canActivate: [LoginGuard] },
  {path:"sign-up", component:SignUpComponent,canActivate: [LoginGuard] },
  {path:"dashboard", component:DashboardComponent, canActivate: [AuthGuard],
    children:[
      {path:"vetements", component:ListVetementsComponent},
      {path: "ensembles" , component:ListEnsembleComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
