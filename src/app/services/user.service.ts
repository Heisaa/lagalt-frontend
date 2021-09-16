import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBaseUrl = "http://localhost:3000/users/"

  constructor(private readonly http: HttpClient) { }

  getUserById(id: string)  {
    return this.http.get<User>(this.userBaseUrl + id);
  }
}
