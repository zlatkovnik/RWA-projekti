import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.username, this.password)
      .subscribe((user) => console.log(user));
  }
}