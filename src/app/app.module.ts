import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { AuthService } from './_services/auth.service';
import { CountryItemComponent, DialogContentExampleDialogComponent } from './country/country-item/country-item.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { CityItemComponent, DialogComponent } from './city/city-item/city-item.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { AddCityComponent } from './city/add-city/add-city.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SpinnerComponent,
    CountryItemComponent,
    CountryListComponent,
    AddCountryComponent,
    DialogContentExampleDialogComponent,
    CityItemComponent,
    CityListComponent,
    AddCityComponent,
    DialogComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [HttpClientModule,  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
