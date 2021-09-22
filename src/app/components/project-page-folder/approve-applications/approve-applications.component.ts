import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Application, ApplicationDisplay, ApplicationGet } from 'src/app/models/application.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ApplicationService } from 'src/app/services/application.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-approve-applications',
  templateUrl: './approve-applications.component.html',
  styleUrls: ['./approve-applications.component.css']
})
export class ApproveApplicationsComponent implements OnInit {
  @Input() project: Project | undefined;
  @Input() notApprovedApplications: ApplicationGet[] | undefined;
  @Output() closeEvent = new EventEmitter<boolean>();
  displayApplications: ApplicationDisplay[] = [];
  answeredApplications: ApplicationDisplay[] = [];
  isSubmitted = false;
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;

  constructor(
    private readonly userService: UserService, 
    private readonly applicationService: ApplicationService,
    private readonly keycloak: KeycloakService,
    private readonly projectService: ProjectsService
    ) { }

  async ngOnInit() {
    // Get loggedin user
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.notApprovedApplications?.forEach(application => {
      // Get user to display info when showing applications
      this.getUserById(application.userId);
    });
  }

  submitApprovals(form: NgForm) {
    this.isSubmitted = true;
    if (form.valid) {
      console.log(form.value)
      for (const [key, value] of Object.entries(form.value)) {
        if (this.userProfile != null && this.userProfile.id != undefined) {
          if (value === "approve") {
            const applicationId = Number(key.slice(11));
            // Set the applications to approved
            this.setApproved(applicationId, this.userProfile.id);
            // Connect the user and project
            const userIdToBeAdded = this.displayApplications.find(application => application.applicationId === applicationId)?.userId;
            if (this.project != undefined && userIdToBeAdded != undefined) {
              this.projectService.addUserToProject(this.project.projectId, userIdToBeAdded);
            }
          } else {
            // Deny the application
          }
        }
      }
      this.closeModal()
    }
  }

  closeModal() {
    this.closeEvent.emit(false);
  }

  getUserById(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => {
        const application = this.notApprovedApplications?.find(application => application.userId === data.userId);
        if (application != undefined) {
          const appDisplay: ApplicationDisplay = {
            applicationId: application.applicationId,
            userId: application.userId,
            projectId: application.projectId,
            motivation: application.motivation,
            approved: application.approved,
            approvedByOwnerId: application.approvedByOwnerId,
            user: data,
          }
          this.displayApplications.push(appDisplay);
        }
      })
  }

  setApproved(applicationId: number, ownerId: string) {
    this.applicationService.setApproved(applicationId, ownerId)
      .subscribe();
  }
}
