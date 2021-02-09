import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/_model/city';
import { Country } from 'src/app/_model/country';
import { CityService } from 'src/app/_services/city.service';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  cities: City[];
  country: Country = {name:''};
  errorHappen = false;
  startSpinning = false;
  cityByCountryId: boolean;
  countryId: number;
  title: String;
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private cityService: CityService,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.cityByCountryId =
      this.activatedRoute.snapshot.url[1] &&
      this.activatedRoute.snapshot.url[1].path === 'country' &&
      true;

    // console.log(this.activatedRoute.snapshot.url);
    this.startSpinning = true;

    if (this.cityByCountryId) {
      this.countryId = this.activatedRoute.snapshot.params.countryId;
      this.cityService.getAllCitiesInCountry(this.countryId).subscribe(
        (res) => {
          this.startSpinning = false;
          this.cities = [...res];
        },
        (err) => {
          this.startSpinning = false;
          this.openSnackBar(err.statusText, 'Error');
        },
        () => {}
      );

      this.countryService.getCountryById(this.countryId).subscribe(
        (res) => {
          this.startSpinning = false;
          this.title = `Cities at ${res.name}`
          this.country = res;
        },
        (err) => {
          this.startSpinning = false;
          this.openSnackBar(err.statusText, 'Error');
        }
      );
    } else {
      this.cityService.getAllCities().subscribe(
        (res) => {
          this.startSpinning = false;
          this.cities = [...res];
        },
        (err) => {
          this.startSpinning = false;
          this.openSnackBar(err.statusText, 'Error');
        },
        () => {}
      );
    }
  }
}
