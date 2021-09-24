
import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Project } from 'src/app/models/project.model';
import { Skill, User } from 'src/app/models/user.model';
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
  skills: Skill[] = [];
  isHidden: boolean = false;
  //portfolios: [] = [];
  isOwnPage: boolean = false;
  image: string = "";
  hasPicture: boolean = false;
  idFromUrl = "";

  constructor(private readonly route: ActivatedRoute, private readonly keycloak: KeycloakService, public readonly userService: UserService, private readonly projectsService: ProjectsService, private readonly router: Router) { }


  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    this.route.params.subscribe(params => {
      this.idFromUrl = params["id"];
      if (this.idFromUrl != null) {
        this.getUser(this.idFromUrl);
        this.getProjects(this.idFromUrl);
      }
    });

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();

      if ((this.route.snapshot.url[1].toString() !== this.userId) && (this.userDetails?.hidden)) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }


    } else {
      console.log("NOT LOGGED IN");
      this.userId = this.route.snapshot.url[1].toString();
      console.log("USER ID, NOT LOGGED IN " + this.userId)
      this.getUser(this.userId);

      if (this.userDetails?.hidden) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
    }

  }

  isOwnPageCheck(id: string) {
    this.isOwnPage = this.userProfile?.id === id;
  }



  getUser(id: string) {

    this.userService.getUserById(id)
      .subscribe((data: User) => {

        this.userDetails = data;
        this.isOwnPageCheck(this.idFromUrl);
        console.log(this.isOwnPage)
        this.image = "https://avatars.dicebear.com/api/open-peeps/" + data.userName + ".svg"

        if (this.userDetails != undefined) {
          if (this.userDetails.profilePhoto !== null && this.userDetails.profilePhoto !== undefined) {
            this.image = this.userDetails.profilePhoto
          }
        }

        //this.portfolios = data.portfolios;
      },
        (error: any) => {
          if (error.status == 404) {
            console.log("skapa ny user");

          }
        }
      );
  }

  getProjects(id: string) {
    this.projectsService.getProjectsByUser(id)
      .subscribe((data: Project[]) => {
        this.projects = data;
      });
  }

  gotoEdit() {
    this.router.navigateByUrl("profile/edit/" + this.userDetails?.userId);
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }


}
