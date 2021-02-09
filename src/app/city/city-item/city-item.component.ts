import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/_model/city';
import { CityService } from 'src/app/_services/city.service';


@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent implements OnInit {

  @Input() city: City ={name: '', countryId: 0};
  constructor(
    private dialog: MatDialog,
    private cityService: CityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '270px',
      data: { name: this.city.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        this.cityService.deleteCity(this.city.id).subscribe(
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
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
