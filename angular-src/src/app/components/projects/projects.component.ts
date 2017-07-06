import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';



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

  projects: Object;  
  projectForm: FormGroup;
  searchString: String;

  constructor(
  	private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private _fb: FormBuilder
  	) { }

  ngOnInit() {

    this.authService.getProjects().subscribe(projects => {
        this.projects = projects;
    }, err => {
      console.log(err);
    })

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

}
