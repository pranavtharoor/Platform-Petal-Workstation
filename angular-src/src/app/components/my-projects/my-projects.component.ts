import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

interface Address {
  street: String,
  city:  String,
  state: String,
  country: String,
  pinCode:  String
}

interface Profile {
  username: String;
  name: String;
  dob: String,
  gender:  String,
  address: Address
}

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  searchStringUser: String;
  username: String;
  profiles: Profile;
  userProjects: Object;
  project: Object;
  invites: Object;
  teams: Object[];
  userIsCreator: Boolean;

  constructor(
  	private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private _fb: FormBuilder
  	) { }

  ngOnInit() {
    this.authService.getUserProjects().subscribe(projects => {
        this.userProjects = projects;
    }, err => {
      console.log(err);
    });
    this.authService.getTeams().subscribe(data => {
    	this.invites = data.invites;
    	this.teams = data.teams;
    }, err => {
    	console.log(err);
    });
  }

  onUserSearch() {
    if(this.searchStringUser != '') {
      this.authService.getProfile().subscribe(profile => {
        this.username = profile.username;
        this.authService.getProfilesAfterSearch(this.searchStringUser).subscribe(profiles => {
          var pos = profiles.findIndex((element) => {
           return element.username == this.username;
          });
          if (pos >= 0)
            profiles.splice(pos, 1);
          this.profiles = profiles;
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    } 
  }

  viewProject(projectName, creator) {
    this.authService.getProject(projectName, creator).subscribe(project => {
      this.project = project;
    	this.userIsCreator = true;
    });
  }

  sendTeamInvite(receiver, projectName) {
  	this.authService.sendTeamInvite(receiver, projectName).subscribe(project => {
  		this.project = project;
	  });
  }

  acceptProjectInvite(projectName, creator) {
  	this.authService.acceptProjectInvite(projectName, creator).subscribe(data => {
  		this.invites = data.invites;
      this.teams = data.teams;
      this.authService.getTeams().subscribe(data => {
        this.invites = data.invites;
        this.teams = data.teams;
      }, err => {
        console.log(err);
      });
    });
  }

  declineProjectInvite(projectName, creator) {
  	this.authService.declineProjectInvite(projectName, creator).subscribe(data => {
  		this.invites = data.invites;
      this.teams = data.teams;
      this.authService.getTeams().subscribe(data => {
        this.invites = data.invites;
        this.teams = data.teams;
      }, err => {
        console.log(err);
      });
    });
  }

  getProject(projectName, creator) {
  	this.authService.getProject(projectName, creator).subscribe(project => {
  		this.project = project;
  		this.userIsCreator = false;
  	});
  }

  removeMemberFromProject(projectName, member) {
    this.authService.removeMemberFromProject(projectName, member).subscribe(project => {
      this.project = project;
    });
  }

  leaveProject(projectName, creator) {
    this.authService.leaveProject(projectName, creator).subscribe(data => {
      if (data.success) {
        delete this.project;
      }
    });
    this.authService.getTeams().subscribe(data => {
      this.invites = data.invites;
      this.teams = data.teams;
    }, err => {
      console.log(err);
    });
  }

  isInTeam(username) {
    for(var i = 0; i < this.project['team'].length; i++) {
      if(this.project['team'][i].username == username) 
        return true;
      else
        return false;
    }
  }

  acceptRequestToJoinTeam(sender, projectName) {
    this.authService.acceptRequestToJoinTeam(sender, projectName).subscribe(project => {
      this.project = project;
    }, err => {
      console.log(err);
    });
  }

  declineRequestToJoinTeam(sender, projectName) {
    this.authService.declineRequestToJoinTeam(sender, projectName).subscribe(project => {
      this.project = project;
    }, err => {
      console.log(err);
    });

  }

}
