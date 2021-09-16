import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'src/app/models/user.model';
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

  constructor(private readonly keycloak: KeycloakService, public readonly userService: UserService) { }

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

    
  }

  getUser(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => {
        this.userDetails = data;
      });
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

 
}
