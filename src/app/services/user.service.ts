import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBaseUrl = environment.apiUrl + "users/"

  constructor(private readonly http: HttpClient) { }

  getUserById(id: string)  {
    return this.http.get<User>(this.userBaseUrl + id);
  }

  postUser(user: User) {
    return this.http.post<User>(this.userBaseUrl, user);
  }

  /*putUser(user: User) {
    return this.http.put<User>(this.userBaseUrl, user);
  }*/

}
