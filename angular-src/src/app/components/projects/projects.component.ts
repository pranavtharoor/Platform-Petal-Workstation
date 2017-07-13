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


  interface Project {
    projectName: String;
    description: String;
    tags: String[];
    languages: String[];
  }

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  userProjects: Object;
  projects: Object;  
  projectForm: FormGroup;
  searchString: String;
  searchStringUser: String;
  username: String;
  profiles: Profile;
  teams: Object[];
  invites: Object[];
  sentTeamRequests: Object[];

  constructor(
  	private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private _fb: FormBuilder
  	) { }

  ngOnInit() {

    this.authService.getTeams().subscribe(data => {
      this.teams = data.teams;
      this.invites = data.invites;
      this.sentTeamRequests = data.sentTeamRequests;
    }, err => {
      console.log(err);
    });

    this.authService.getProjects().subscribe(projects => {
        this.projects = projects;
    }, err => {
      console.log(err);
    });

    this.projectForm = this._fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      private: Boolean,
      tags: this._fb.array([
          this.initTag(),
      ]),
      languages: this._fb.array([
          this.initLanguage(),
      ])
    });

  }

  initTag() {
        return this._fb.group({
            tag: ['', Validators.required]
        });
    }

  addTag() {
      const control = <FormArray>this.projectForm.controls['tags'];
      control.push(this.initTag());
  }

  removeTag(i: number) {
      const control = <FormArray>this.projectForm.controls['tags'];
      control.removeAt(i);
  }

  initLanguage() {
        return this._fb.group({
            language: ['', Validators.required]
        });
    }

  addLanguage() {
      const control = <FormArray>this.projectForm.controls['languages'];
      control.push(this.initLanguage());
  }

  removeLanguage(i: number) {
      const control = <FormArray>this.projectForm.controls['languages'];
      control.removeAt(i);
  }

  save(newProject: Project) {

    this.authService.addProject(newProject).subscribe(data => {
      if(data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'color-success', timeout: 3000});
        this.authService.getProjects().subscribe(projects => {
        this.projects = projects;
        }, err => {
          console.log(err);
        });
        this.authService.getUserProjects().subscribe(projects => {
            this.userProjects = projects;
        }, err => {
          console.log(err);
        });
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'color-danger', timeout: 3000});
      }
    });
  }

  onSearchSubmit() {

    if(this.searchString == '') {

      this.authService.getProjects().subscribe(projects => {
          this.projects = projects;
      }, err => {
        console.log(err);
      });

    } else {
      this.authService.getProjectsAfterSearch(this.searchString).subscribe(projects => {
          this.projects = projects;
      }, err => {
        console.log(err);
      });
    }
  }

  requestJoinProject(projectName, creator) {
    this.authService.requestJoinProject(projectName, creator).subscribe(data => {
        this.authService.getTeams().subscribe(data => {
          this.sentTeamRequests = data.sentTeamRequests;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    })
  }

}
