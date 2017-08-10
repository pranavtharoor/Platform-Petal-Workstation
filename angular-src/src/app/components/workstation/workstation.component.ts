import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.css']
})
export class WorkstationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar() {
  	$('.ui.labeled.icon.sidebar').sidebar('toggle');
  }

}
