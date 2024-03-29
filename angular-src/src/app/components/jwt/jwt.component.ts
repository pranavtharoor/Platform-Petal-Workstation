import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.css']
})
export class JwtComponent implements OnInit {

  constructor(
    private authService: AuthService,
  	private router: Router,
  	private flashMessage: FlashMessagesService,
    private socketioService: SocketioService
    ) { }

  ngOnInit() {
  	this.authService.getJwt().subscribe(data => {
  		if(data.success) {
        	this.authService.storeUserData(data.token, data.user);
        	this.socketioService.login(data.token);
  		    this.flashMessage.show('Logged in', {cssClass: 'color-success', timeout: 5000});
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
	            this.router.navigate(['dashboard']);
	        }
  		} else {
  			this.flashMessage.show(data.msg, {cssClass: 'color-danger', timeout: 5000});
  			this.router.navigate(['login']);
  		}
  	});
  }

}
