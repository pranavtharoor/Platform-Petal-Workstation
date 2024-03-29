import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username: String;
	password: String;

  constructor(
  	private authService: AuthService,
  	private router: Router,
  	private flashMessage: FlashMessagesService,
    private socketioService: SocketioService
  	) { }

  ngOnInit() {
  }

  onLoginSubmit() {
  	const user = {
  		username: this.username,
  		password: this.password
  	}

  	this.authService.authenticateUser(user).subscribe(data => {
  		if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.socketioService.login(data.token);
  		  this.flashMessage.show('Logged in', {cssClass: 'color-success', timeout: 1000});
        if(data.user.lastlogin == 'never') {
          this.authService.setLastLogin().subscribe(success => {
            }, err => {
              console.log(err);
            });
          this.router.navigate(['editprofile']);
        } else{
          this.authService.setLastLogin().subscribe(success => {
            }, err => {
              console.log(err);
            });
          this.router.navigate(['workstation']);
        }
  		} else {
  			this.flashMessage.show(data.msg, {cssClass: 'color-danger', timeout: 3000});
  			this.router.navigate(['login']);
  		}
  	});
  }

}