import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/_model/city';
import { Country } from 'src/app/_model/country';
import { CityService } from 'src/app/_services/city.service';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  city: City = { name: '', countryId: 26 };
  editMode: boolean;
  countries: Country[];
  country: Country;
  startSpinner = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private cityService: CityService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editMode =
      this.activatedRoute.snapshot.url[1] &&
      this.activatedRoute.snapshot.url[1].path === 'edit' &&
      true;
    const countryId = this.activatedRoute.snapshot.params.countryId;
    this.city.countryId = +countryId;

    if (this.editMode) {
      this.startSpinner = true;

      const id = this.activatedRoute.snapshot.params.id;

      this.countryService.getAllCountries().subscribe(
        (res) => {
          this.startSpinner = false;
          this.countries = res;
        },
        (err) => {
          this.startSpinner = false;

          this.openSnackBar(err.statusText, 'Error');
        }
      );


      this.cityService.gitCityById(id).subscribe(
        (res) => {
          this.startSpinner = false;
          this.city = res;
        },
        (err) => {
          this.startSpinner = false;
          this.openSnackBar(err.statusText, 'Error');
        }
      );
      this.countryService.getCountryById(countryId).subscribe(
        (res) => {
          this.startSpinner = false;
          this.country = res;
          // this.city = res;
        },
        (err) => {
          this.startSpinner = false;

          this.openSnackBar(err.statusText, 'Error');
        }
      );

 
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onAddCity(): void {
    this.startSpinner = true;
    const countryId = this.activatedRoute.snapshot.params.countryId;
    // console.log(countryId);

    if (this.editMode) {
      this.cityService.updateCity(this.city).subscribe(
        (res) => {
          this.startSpinner = false;
          this.router.navigate(['/city', 'country', countryId]);
        },
        (err) => {
          this.startSpinner = false;

          this.openSnackBar(err.statusText, 'Error');
        },
        () => {}
      );
    } else {
      this.cityService.addCity(this.city).subscribe(
        (res) => {
          this.startSpinner = false;
          this.router.navigate(['/city', 'country', countryId]);
        },
        (err) => {
          this.startSpinner = false;

          this.openSnackBar(err.statusText, 'Error');
        },
        () => {}
      );
    }
  }
}
