import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-banner',
  templateUrl: './project-banner.component.html',
  styleUrls: ['./project-banner.component.css']
})
export class ProjectBannerComponent implements OnInit {
  @Input() project?: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
