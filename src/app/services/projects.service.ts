import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectPage } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = "api/projects/";
  private testUrl = "http://localhost:3000/projects/"
  private projectsByUserUrl = "http://localhost:3000/users/";

  constructor(private readonly http: HttpClient) { }

  getProjects(page: number, size: number) {
    return this.http.get<ProjectPage>(this.projectsUrl + "?PageNumber=" + page + "&PageSize=" + size);
  }

  getProject(id: number) {
    return this.http.get<Project>(this.projectsUrl + id + "/project")
  }

  getProjectsByUser(userId: string) {
    // Change 1 to userId later
    return this.http.get<Project[]>(this.projectsByUserUrl + 1 + "/projects");
  }
}
