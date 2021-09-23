import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lagalt-frontend';
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;
  userDetails: User | undefined;

  constructor(private readonly keycloak: KeycloakService, private readonly router: Router, private userService: UserService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile.firstName);

      if (this.userProfile !== null || this.userProfile !== undefined) {
        var id = this.userProfile.id;
        this.userService.getUserById(id!)
          .subscribe(
            (data: User) => {},
            (error: any) => {
              if (error.status === 404) {
                this.addUserToDatabase();
              }

            }
          );
      }
    }
  }

  addUserToDatabase() {
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
  }

  /*checkUser (id: string)  {
    this.userService.getUserById(id) 
      .subscribe((data: User) => {
        console.log(data)
        this.userDetails = data;
        if (this.userDetails === null || this.userDetails === undefined) {
          
        } 
      });
    
  }*/

  postUser(user: User) {
    this.userService.postUser(user)
      .subscribe((data: User) => {
        console.log(data);
        this.router.navigateByUrl("profile/edit/" + data.userId);
      });
  }

  //check if exists in db, if not = new user -> edit profile component. use keycloak service in edit component
  // add to db in app component cal
}
