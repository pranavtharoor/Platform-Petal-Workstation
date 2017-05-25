import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  repassword: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
  	const user = {
  		name: this.name,
  		email: this.email,
  		username: this.username,
  		password: this.password,
      repassword: this.repassword
  	}
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Fill all fields', {cssClass: 'color-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Use valid email', {cssClass: 'color-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.checkPasswords(user.password, user.repassword)) {
      this.flashMessage.show('Passwords are not same', {cssClass: 'color-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Registered. Login', {cssClass: 'color-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'color-danger', timeout: 3000});
      }
    });

  }

}
