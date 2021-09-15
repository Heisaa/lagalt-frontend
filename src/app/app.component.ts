import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lagalt-frontend';
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;

  constructor(private readonly keycloak: KeycloakService, private readonly router: Router) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile.firstName);
    }
  }

   //check if exists in db, if not = new user -> edit profile component. use keycloak service in edit component
   // add to db in app component cal
}
