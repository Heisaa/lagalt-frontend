import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  isLoggedIn: boolean = false;
  public userProfile: KeycloakProfile | null = null;
  userDetails: User | undefined;
  projects: Project[] = [];

  constructor(private readonly projectService: ProjectsService, private readonly router: Router, private readonly userService: UserService,private readonly keycloak: KeycloakService) { }

  async ngOnInit() {   
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    //console.log(this.route.snapshot.url[1].toString());

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      if (this.userProfile.id != undefined) {
        this.getUser(this.userProfile.id);
      }
    }
    
  }

  /*addUserToDatabase() {

    if (this.userProfile?.id != null && this.userProfile?.username != null) {
      const user: User = {
        userId: this.userProfile.id,
        userName: this.userProfile.username,
        hidden: false,
        skills: [],
        fields: [],
        portfolios: []
      }
      this.postUser(user);
    }
  }*/

  getProjects(id: string) {
    this.projectService.getProjectsByUser(id)
      .subscribe((data: Project[]) => {
        this.projects = data;
        data.forEach(element => {
          console.log("TEST" + element.projectName + element.projectId)
        });
      })
  }


 /* postUser(user: User) {
    this.userService.postUser(user)
    .subscribe((data: User) => {
      console.log(data);
      this.checkUser(user.userId);
    });
  }*/

  /*putUser(user: User) {
    this.userService.putUser(user)
    .subscribe(data => {
      console.log(data);
    });
  }*/

  getUser(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => {
        this.userDetails = data;
        
        //this.portfolios = data.portfolios;
      });
  }
  
  /*checkUser (id: string)  {
    this.userService.getUserById(id) 
      .subscribe((data: User) => {
        console.log(data)
        this.userDetails = data;
        if (this.userDetails === null || this.userDetails === undefined) {
          this.addUserToDatabase();
        } else {
          this.getProjects(id);
        }
      });
    
  }*/

}
