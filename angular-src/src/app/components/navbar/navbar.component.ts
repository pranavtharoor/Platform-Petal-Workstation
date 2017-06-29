import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  	private authService: AuthService,
  	private router: Router,
  	private flashMessage: FlashMessagesService,
    private socketioService:SocketioService
  	) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.socketioService.logout();
    this.authService.logout();
  	this.flashMessage.show('Logged Out', {cssClass: 'alert-success', timeout: 3000});
  	this.router.navigate(['/login']);
  	return false;
  }

}
