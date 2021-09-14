import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = "http://localhost:3000/projects";
  private projectsByUserUrl = "http://localhost:3000/users/";

  constructor(private readonly http: HttpClient) { }

  getProjects(page: number, limit: number) {
    return this.http.get<Project[]>(this.projectsUrl + "?_page=" + page + "&_limit=" + limit);
  }

  getProjectsByUser(userId: string) {
    // Change 1 to userId later
    return this.http.get<Project[]>(this.projectsByUserUrl + 1 + "/projects");
  }
}
