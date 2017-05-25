import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	name: String;
  dob: String;
  gender: String;
  street: String;
  city: String;
  state: String;
  country: String;
  pinCode: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onEditProfileSubmit() {
  	const profile = {
  		name: this.name,
      dob: this.dob,
      gender: this.gender,
      street: this.street,
      city: this.city,
      state: this.state,
      country: this.country,
      pinCode: this.pinCode
  	}
  
  	this.authService.updateProfile(profile).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Profile updated', {cssClass: 'color-success', timeout: 3000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show('Unable to update profile', {cssClass: 'color-danger', timeout: 3000});
      }
    });

  }

}
