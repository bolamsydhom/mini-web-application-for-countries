import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('divState', [
      state(
        'open',
        style({
          opacity: '1',
          transform: 'scale(1)',
        })
      ),
      transition('void => *', [
        animate(
          2000,
          keyframes([
            style({ opacity: 0, transform: 'scale(0)' }),
            style({ opacity: 0.25, transform: 'scale(1)' }),
            style({ opacity: 0.75, transform: 'scale(1.05)' }),
            style({ opacity: 1, transform: 'scale(1)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  errorHappen = false;
  startSpinning = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  createForms() {
    this.form = this.fb.group({
      Email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      Password: new FormControl(
        '',
        Validators.compose([Validators.minLength(8), Validators.required])
      ),
    });
  }

  ngOnInit(): void {
    this.createForms();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onLogin(form): void {
    this.startSpinning = true;
    this.authService.login(form).subscribe(
      (res) => {
        sessionStorage.setItem('token', res.token);
        const time = new Date().getTime();
        sessionStorage.setItem('savedTime', time.toString());
        this.startSpinning = false;
        this.router.navigate([''], { replaceUrl: true });
      },
      (err) => {
        this.startSpinning = false;

        this.openSnackBar(err.statusText, 'Error');
      },
      () => {}
    );
  }
}
