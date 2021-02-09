import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/_model/country';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  errorHappen = false;
  startSpinning = false;
  constructor(
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.startSpinning = true;
    this.countryService.getAllCountries().subscribe(
      (res) => {
        this.startSpinning = false;
        this.countries = [...res];
      },
      (err) => {
        this.startSpinning = false;
        this.openSnackBar(err.statusText, 'Error');
      },
      () => {}
    );
  }
}
