import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project, ProjectPage } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = environment.apiUrl + "projects";
  private projectsByUserUrl = environment.apiUrl + "users/projects/";

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
}
