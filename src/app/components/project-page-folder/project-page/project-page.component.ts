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
  progressSteps = ["Founding", "In progress", "Stalled", "Completed"];
  progress: string | undefined;
  applicationFeedback = "";
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  modalDisplay = "none";
  motivation = "";
  isAdmin = true;
  notApprovedApplications: Application[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService,
    private readonly applicationService: ApplicationService
  ) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();

      //Ta bort sen
      this.keycloak.getToken()
        .then(token => console.log(token))

    }

    this.projectIdFromUrl = Number(this.route.snapshot.paramMap.get("id"));
    this.getProject(this.projectIdFromUrl);
  }

  getProject(id: number) {
    this.projectService.getProject(id)
      .subscribe((data: Project) => {
        this.project = data;
        this.progress = this.progressSteps[data.progress];
        // compare userid adminid
      });
  }

  //Todo kolla så att man inte är admin eller redan är med i projektet, visa då inte knappen i html
  applyToProject() {

    if (this.userProfile != null && this.userProfile.id != undefined && this.project != null) {
      const application: Application = {
        userId: this.userProfile.id,
        projectId: this.project.projectId,
        motivation: this.motivation,
        approved: false,
        apprvedByOwnerId: null,
      }

      this.addApplication(application);
      this.applicationFeedback = "You have applied to this project!";
      this.closeModal();
    }



  }

  addApplication(application: Application) {
    this.applicationService.addApplication(application)
      .subscribe(data => {
        console.log(data);
      });
  }

  getApplicationsByProjects(projectId: number) {
    this.applicationService.getApplicationByProject(projectId)
      .subscribe((data: Application[]) => {
        console.log("")
        this.notApprovedApplications = data.filter(application => application.approved == false);
      })
  }

  openModal() {
    this.modalDisplay = "block";
  }

  closeModal() {
    this.motivation = "";
    this.modalDisplay = "none";
  }

}
