import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Object;
  projectName: String;
  description: String;
  tags: Array<String>;
  languages: Array<String>;

  constructor(
  	private authService: AuthService,
    private flashMessage: FlashMessagesService
  	) { }

  ngOnInit() {

  	this.authService.getProjects().subscribe(projects => {
  		this.projects = projects;
  	}, err => {
  		console.log(err);
  	});

  }

  onProjectSubmit() {
  	const newProject = {
  	  projectName: this.projectName,
  	  description: this.description,
  	  tags: this.tags,
  	  languages: this.languages
  	}

  	this.authService.addProject(newProject).subscribe(data => {
  	  if(data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'color-success', timeout: 3000});
        this.authService.getProjects().subscribe(projects => {
	  	  this.projects = projects;
	  	}, err => {
	  		console.log(err);
	  	});
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'color-danger', timeout: 3000});
      }
  	});
  }

  addTag() {
    this.tags.push('asdads');
  }

  addLanguage() {

  }  

}