import { NgModule } from '@angular/core';
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
    ListEnsembleComponent
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
    ToastNotificationConfigModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
