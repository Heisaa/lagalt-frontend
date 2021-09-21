import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application, ApplicationGet } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationUrl = environment.apiUrl + "Application";
  private applicationsByProjectUrl = environment.apiUrl + "projects"

  constructor(private readonly http: HttpClient) { }

  addApplication(application: Application) {
    return this.http.post<Application>(this.applicationUrl, application);
  }

  getApplicationByProject(projectId: number) {
    return this.http.get<ApplicationGet[]>(this.applicationsByProjectUrl + "/" +projectId + "/applications")
  }

  setApproved(applicationId: number, ownerId: string) {
    return this.http.put<any>(this.applicationUrl, {}, { params: { applicationId, ownerId } })
  }
}
