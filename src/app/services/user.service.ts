import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Skill, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBaseUrl = environment.apiUrl + "users"

  constructor(private readonly http: HttpClient, private readonly keycloak: KeycloakService) { }

  getUserById(id: string) {
    return this.http.get<User>(this.userBaseUrl + "/" + id);
  }

  postUser(user: User) {
    return this.http.post<User>(this.userBaseUrl, user);
  }

  putUser(user: User, userId: string) {
    return this.http.put<User>(this.userBaseUrl + "?userId=" + userId, user);
  }

  getSkills() {
    return this.http.get<Skill[]>(environment.apiUrl + "Skills");
  }

}

