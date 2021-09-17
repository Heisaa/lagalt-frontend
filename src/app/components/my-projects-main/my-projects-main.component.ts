import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Project, ProjectObject } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-my-projects-main',
  templateUrl: './my-projects-main.component.html',
  styleUrls: ['./my-projects-main.component.css']
})
export class MyProjectsMainComponent implements OnInit {
  @Input() projectsForLoggedInUser?: Project[];

  constructor(
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.getProjectByUser();
  }

  gotoProject(projectId: number) {
    this.router.navigateByUrl("project/" + projectId);
  }

  async getProjectByUser() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      const userId = (await this.keycloak.loadUserProfile()).id;
      if(userId) {
        this.projectService.getProjectsByUser(userId)
          .subscribe((data: ProjectObject) => {
            this.projectsForLoggedInUser = data.projects;
          });
      }
    }
  }

}
