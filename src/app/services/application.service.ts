import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationUrl = environment.apiUrl + "Application";

  constructor(private readonly http: HttpClient) { }

  addApplication(application: Application) {
    return this.http.post<Application>(this.applicationUrl, application);
  }
}
