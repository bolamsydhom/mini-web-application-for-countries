import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/_model/country';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss'],
})
export class CountryItemComponent implements OnInit {
  @Input() country: Country;
  constructor(
    private dialog: MatDialog,
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '250px',
      data: { name: this.country.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.countryService.deleteCountry(this.country.id).subscribe(
          (res) => { location.reload(); },
          (err) => {
            this.openSnackBar(err.statusText, 'Error');
          }
        );
      }
    });
  }
}

@Component({
  selector: 'dialog-content',
  template: `
    <div mat-dialog-title>
      <h4>You are about to delete</h4>

      <h1 mat-dialog-content>{{ data.name }}</h1>
    </div>
    <div mat-dialog-actions>
      <button mat-button color="primary" (click)="onNoClick()">Go back</button>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        Yes, Delete
      </button>
    </div>
  `,
  styles: [
    `
      h1 {
        color: red;
      }
    `,
  ],
})
export class DialogContentExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
