import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;
  public token = "";
  public userDetails: User | undefined;
  public userId: string = "";
  projects: Project[] = [];

  constructor(private readonly keycloak: KeycloakService, public readonly userService: UserService, private readonly projectsService: ProjectsService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      if (this.userProfile.id != undefined) {
        this.getUser(this.userProfile.id);
      }
    }
    
    this.keycloak.getToken()
    .then(token=>this.token=token);

    this.getProjects();
  }

  getUser(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => {
        this.userDetails = data;
      });
  }

  getProjects() {
    this.projectsService.getProjectsByUser(this.userId)
      .subscribe((data: Project[]) =>
      {
        this.projects = data
        data.forEach(element => {
          console.log(element.projectName + element.projectId)
        });
      })
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

 
}