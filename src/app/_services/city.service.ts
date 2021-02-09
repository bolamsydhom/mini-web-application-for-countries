import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { City } from '../_model/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  url = `${baseUrl}/city`;
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<any> {
    return this.http.get(this.url);
  }

  gitCityById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getAllCitiesInCountry(countryId: number): Observable<any> {
    return this.http.get(`${this.url}/getcities/${countryId}`);
  }

  addCity(city: City): Observable<any> {
    return this.http.post(`${this.url}`, city);
  }

  updateCity(city: City): Observable<any> {
    return this.http.put(`${this.url}`, city);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
