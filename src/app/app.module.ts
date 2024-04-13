import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/user-dashboard/dashboard/dashboard.component';
import { ListVetementsComponent } from './components/user-dashboard/vetements/list-vetements/list-vetements.component';
import { ItemCardComponent } from './components/user-dashboard/vetements/item-card/item-card.component';
import { ListEnsembleComponent } from './components/user-dashboard/ensembles/list-ensemble/list-ensemble.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { AuthInterceptor } from './services/auth.interceptor.service';
import { AddVetementComponent } from './components/user-dashboard/vetements/add-vetement/add-vetement.component';
import { PlanificationComponent } from './components/user-dashboard/planification/planification.component';
import { CalendarModule, DateAdapter,CalendarNativeDateFormatter, DateFormatterParams, CalendarDateFormatter } from 'angular-calendar';

import {adapterFactory} from 'angular-calendar/date-adapters/date-fns'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EnsempleItemComponent } from './components/user-dashboard/ensembles/ensemple-item/ensemple-item.component';
import { UpdatePlanificationComponent } from './components/user-dashboard/planification/update-planification/update-planification.component';
registerLocaleData(localeFr ,'fr')

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
      return new Intl.DateTimeFormat(locale,{hour: 'numeric' , minute:'numeric'}).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale,{hour: 'numeric' , minute:'numeric'}).format(date);

  }

}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PreloaderComponent,
    HeaderComponent,
    CategoryComponent,
    HomeSliderComponent,
    LoginComponent,
    HomePageComponent,
    SignUpComponent,
    DashboardComponent,
    ListVetementsComponent,
    ItemCardComponent,
    ListEnsembleComponent,
    AddVetementComponent,
    PlanificationComponent,
    EnsempleItemComponent,
    UpdatePlanificationComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAwesomePopupModule.forRoot(),     
    ToastNotificationConfigModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    NgbModalModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide : CalendarDateFormatter , useClass : CustomDateFormatter}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
