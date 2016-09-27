import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from 'ui/page';
import { Color } from 'color';
import { View } from 'ui/core/view';
import { User, UserService } from '../shared';

@Component({
  moduleId: module.id,
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: [
    "login-common.component.css",
    "login.component.css"
  ],
  providers: [
    UserService
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild('container') container: ElementRef
  user: User
  isLoggingIn = true

  constructor(private userService: UserService, private router: Router, private page: Page) {
    this.user = new User()
    this.user.email = 'edge@test.com'
  }

  ngOnInit() {
    this.page.actionBarHidden = true
    this.page.backgroundImage = 'res://bg_login'
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.login()
    }
    else {
      this.register()
    }
  }

  login() {
    this.userService
      .login(this.user)
      .subscribe(
      () => this.router.navigate(['/groceries']),
      error => alert('Unfortunately we could not find your account')
      )
  }

  register() {
    this.userService.register(this.user).subscribe(
      () => {
        alert('Your account was successfully created.')
        this.toggleDisplay()
      },
      () => alert('Unfortunately we were unable to create your account')
    )
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn
    let container = <View>this.container.nativeElement

    container.animate({
      backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
      duration: 200
    })
  }
}