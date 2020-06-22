import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromUser } from '../../store/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  error$: Observable<string>;
  loading$: Observable<boolean>;

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.error$ = this.store.select(fromUser.getStateError);
    this.loading$ = this.store.select(fromUser.getStateLoading);
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.store.dispatch(
        fromUser.errorLoginUser({ error: 'Form is not valid' })
      );
      return;
    }
    this.store.dispatch(
      fromUser.loginUser({
        username: this.username.value,
        password: this.password.value,
      })
    );
  }
}
