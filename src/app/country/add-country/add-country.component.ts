import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/_model/country';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss'],
})
export class AddCountryComponent implements OnInit {
  country: Country = { name: '' };
  editMode: boolean;
  startSpinner = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editMode =
      this.activatedRoute.snapshot.url[1] &&
      this.activatedRoute.snapshot.url[1].path === 'edit' &&
      true;

    if (this.editMode) {
      this.startSpinner = true;

      const id = this.activatedRoute.snapshot.params.id;
      this.countryService.getCountryById(id).subscribe(
        (res) => {
          this.startSpinner = false;
          this.country = res;
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

  onAddCountry(): void {
    this.startSpinner = true;
    if (this.editMode) {
      this.countryService.updateCountry(this.country).subscribe(
        (res) => {
          this.startSpinner = false;
          this.router.navigate(['']);
        },
        (err) => {
          this.startSpinner = false;

          this.openSnackBar(err.statusText, 'Error');
        },
        () => {}
      );
    } else {
      this.countryService.addCountry(this.country).subscribe(
        (res) => {
          this.startSpinner = false;
          this.router.navigate(['']);
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
