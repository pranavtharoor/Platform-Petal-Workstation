import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profile: Object;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  
  	this.authService.getProfile().subscribe(profile => {
  		this.profile = profile;
      console.log(profile);
  	}, err => {
  		console.log(err);
  	});

  }

}
