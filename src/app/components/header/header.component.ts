import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;

  constructor(private readonly keycloak: KeycloakService, private readonly router: Router) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  gotoProfile() {
    if(this.userProfile) {
      this.router.navigateByUrl("profile/" + this.userProfile.id);
    }
  }

  gotoMainPage() {
    this.router.navigateByUrl("/");
  }

  gotoCreateProject() {
    this.router.navigateByUrl("/create-project")
  }

  logOut() {
    this.keycloak.logout();
  }

  logIn() {
    this.keycloak.login();
  }
}
