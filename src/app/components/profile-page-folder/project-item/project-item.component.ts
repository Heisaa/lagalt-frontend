import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItem implements OnInit {
  @Input() project?: Project

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  goToProject(projectId: number) {
    this.router.navigateByUrl("project/" + projectId)
  }

}
