import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  // {path: '', component: LoginComponent},
  { path: '', redirectTo: '/country', pathMatch: 'full' },
  // {path: 'country', component: CountryListComponent,
  //   canActivate: [AuthGuardService],
  //   children: [
  //     {path: 'edit/:id', component: AddCountryComponent},
  //     {path: 'add', component: AddCountryComponent},
  //   ],
  // },
  // {path: 'city', component: CityListComponent, canActivate: [AuthGuardService],
  //   children: [
  //     { path: 'country/:CountryId', component: CityListComponent},
  //     { path: 'edit/:id', component: AddCityComponent },
  //     { path: 'add', component: AddCityComponent },
  //   ]
  // },
  {path: 'country', component: CountryListComponent, canActivate: [AuthGuardService], data: {animation: 'HomePage'}},
  {path: 'country/add', component: AddCountryComponent, canActivate: [AuthGuardService], data: {animation: 'FilterPage'}},
  {path: 'country/edit/:id', component: AddCountryComponent, canActivate: [AuthGuardService], data: {animation: 'FilterPage'}},
  {path: 'city', component: CityListComponent, canActivate: [AuthGuardService], data: {animation: 'AboutPage'}},
  {path: 'city/country/:countryId', component: CityListComponent, canActivate: [AuthGuardService], data: {animation: 'AboutPage'}},
  {path: 'city/edit/:id/:countryId', component: AddCityComponent, canActivate: [AuthGuardService], data: {animation: 'FilterPage'}},
  {path: 'city/add/:countryId', component: AddCityComponent, canActivate: [AuthGuardService], data: {animation: 'FilterPage'}},

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
