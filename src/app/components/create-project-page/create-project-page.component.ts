import { Component } from '@angular/core';
import { PostProject, Project } from 'src/app/models/project.model';
import { KeycloakService } from 'keycloak-angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

export class CreateProject implements PostProject {
    projectName?: string;
    description?: string;
    urlReference?: string;
}

@Component({
    selector: 'app-create-project-page',
    templateUrl: './create-project-page.component.html',
    styleUrls: ['./create-project-page.component.css']
})
export class CreateProjectPageComponent {

	model = new CreateProject();
	httpDone;

	constructor(
		private readonly projectService: ProjectsService,
		private readonly keycloak: KeycloakService,	
		private readonly router: Router
	) {
		this.httpDone = false;
	 }


	onSubmit(form :any) {
		this.postProject(this.model)		
	}

  async postProject(project : PostProject) {
		const isLoggedIn = await this.keycloak.isLoggedIn();
		if (isLoggedIn) {
			const userId = (await this.keycloak.loadUserProfile()).id;
			if(userId) {
			this.projectService
				.createProject(project, userId)
				.subscribe((response: Project) => {
					this.router.navigateByUrl("project/"+ response.projectId)
				})
			}
		}
  }
}