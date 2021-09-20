import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Application } from 'src/app/models/application.model';
import { Project } from 'src/app/models/project.model';
import { ApplicationService } from 'src/app/services/application.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectIdFromUrl: number | undefined;
  project: Project | undefined;
  progressSteps = ["Founding", "In progress", "Stalled", "Completed"]
  progress: string | undefined;
  applicationFeedback = "";
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  modalDisplay = "none";


  constructor(
    private route: ActivatedRoute, 
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService,
    private readonly applicationService: ApplicationService
    ) {}

  async ngOnInit() {
    this.projectIdFromUrl = Number(this.route.snapshot.paramMap.get("id"));
    this.getProject(this.projectIdFromUrl);

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.keycloak.getToken()
    .then(token=> console.log(token))

    }
  }

  getProject(id: number) {
    this.projectService.getProject(id)
      .subscribe((data: Project) => {
        this.project = data;
        this.progress = this.progressSteps[data.progress];
      });
  }

  //Todo kolla så att man inte är admin eller redan är med i projektet, visa då inte knappen i html
  applyToProject() {
    this.applicationFeedback = "You have applied to this project!";

  }

  addApplication(application: Application) {
    this.applicationService.addApplication(application)
      .subscribe();
  }

  openModal() {
    this.modalDisplay = "block";
  }
  closeModal() {
    this.modalDisplay = "none";
  }

}
