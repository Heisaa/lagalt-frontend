import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = "http://localhost:3000/projects";

  constructor(private readonly http: HttpClient) { }

  getProjects() {
    return this.http.get<Project[]>(this.projectsUrl);
  }
}
