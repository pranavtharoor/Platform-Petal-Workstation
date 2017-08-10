import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs/Subscription';

declare var $:any;

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
  canLeave: Boolean;
  subscription: Subscription;
  message: String;

  constructor(
  	private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private _fb: FormBuilder,
    private socketioService: SocketioService
  	) { 

      this.subscription = this.socketioService.getConnections().subscribe(message => {
        this.message = message;
        // console.log(this.message);
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

      });

  }

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
      $('html, body').animate({
          scrollTop: $('body').offset().top
          }, 500);
      this.project = project;
    	this.userIsCreator = true;
      this.canLeave = false;
    });
  }

  sendTeamInvite(receiver, projectName) {
  	this.authService.sendTeamInvite(receiver, projectName).subscribe(project => {
  		this.project = project;
      this.socketioService.sendTeamInvite(receiver);
	  });
  }

  acceptProjectInvite(projectName, creator) {
  	this.authService.acceptProjectInvite(projectName, creator).subscribe(data => {
  		this.invites = data.invites;
      this.teams = data.teams;
      this.socketioService.acceptTeamInvite(creator);
      this.authService.getTeams().subscribe(data => {
        this.invites = data.invites;
        this.teams = data.teams;
        this.canLeave = true;
      }, err => {
        console.log(err);
      });
    });
  }

  declineProjectInvite(projectName, creator) {
  	this.authService.declineProjectInvite(projectName, creator).subscribe(data => {
  		this.invites = data.invites;
      this.teams = data.teams;
      this.socketioService.declineTeamInvite(creator);
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
      $('html, body').animate({
          scrollTop: $('body').offset().top
          }, 500);
  		this.canLeave = true;
      this.userIsCreator = false;
  	});
  }

  getProjectFromInvite(projectName, creator) {
    this.authService.getProject(projectName, creator).subscribe(project => {
      this.project = project;
      $('html, body').animate({
          scrollTop: $('body').offset().top
          }, 500);
      this.canLeave = false;
      this.userIsCreator = false;
    });
  }

  removeMemberFromProject(projectName, member) {
    this.authService.removeMemberFromProject(projectName, member).subscribe(project => {
      this.project = project;
      this.socketioService.removeTeamMember(member);
    });
  }

  leaveProject(projectName, creator) {
    this.authService.leaveProject(projectName, creator).subscribe(data => {
      if (data.success) {
        delete this.project;
        this.socketioService.leaveTeam(creator);
      }
    });
    this.authService.getTeams().subscribe(data => {
      this.invites = data.invites;
      this.teams = data.teams;
    }, err => {
      console.log(err);
    });
  }

  isInTeamOrRequested(username) {
    var flag = false;
    for(var i = 0; i < this.project['team'].length; i++)
      if(this.project['team'][i].username == username) 
        flag = true;
    for(var i = 0; i < this.project['pending'].length; i++)
      if(this.project['pending'][i].username == username) 
        flag = true;
    for(var i = 0; i < this.project['requests'].length; i++)
      if(this.project['requests'][i].username == username) 
        flag = true;
      return flag;
  }

  acceptRequestToJoinTeam(sender, projectName) {
    this.authService.acceptRequestToJoinTeam(sender, projectName).subscribe(project => {
      this.project = project;
      this.socketioService.acceptJoinTeam(sender);
    }, err => {
      console.log(err);
    });
  }

  declineRequestToJoinTeam(sender, projectName) {
    this.authService.declineRequestToJoinTeam(sender, projectName).subscribe(project => {
      this.project = project;
      this.socketioService.declineJoinTeam(sender);
    }, err => {
      console.log(err);
    });

  }

}