import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBaseUrl = "http://localhost:3000/users/"

  constructor() { }

  getUserById(id: number)  {
    //return user by ID

  }
}
