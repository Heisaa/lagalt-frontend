import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message, PostMessage, Project, ProjectPage } from '../models/project.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = environment.apiUrl + "projects";
  private projectsByUserUrl = environment.apiUrl + "users/projects/";
  private messageUrl = environment.apiUrl + "Message";

  constructor(private readonly http: HttpClient) { }

  getProjects(page: number, size: number) {
    console.log(this.projectsUrl);
    return this.http.get<ProjectPage>(this.projectsUrl + "?PageNumber=" + page + "&PageSize=" + size);
  }

  getProject(id: number) {
    return this.http.get<Project>(this.projectsUrl + "/" + id + "/project")
  }

  getProjectsByUser(userId: string) {
    return this.http.get<Project[]>(this.projectsByUserUrl + userId);
  }

  getMessages(projectId: number) {
    return this.http.get<Message[]>(this.projectsUrl + "/" + projectId + "/messages");
  }

  addMessage(message: PostMessage) {
    return this.http.post<PostMessage>(this.messageUrl, message);
  }

  addUserToProject(projectId: number, userId: string) {
    return this.http.put<any>(this.projectsUrl + "/" + projectId + "/user/" + userId, {}, {params: {projectId, userId}})
  }

}
