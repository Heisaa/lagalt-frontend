import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Field } from 'src/app/models/field.model';
import { Project } from 'src/app/models/project.model';
import { FieldsService } from 'src/app/services/fields.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public userProfile: KeycloakProfile | null = null;
  fields: Field[] = [];
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchFilterdProjects: Project[] = [];

  constructor(
    private readonly fieldService: FieldsService,
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService
  ) { }


  ngOnInit(): void {
    this.getFields();
    this.getProjects();
  }

  filterSearch(search: string) {
    if (search.length > 0) {
      this.searchFilterdProjects = this.filteredProjects.filter(project => {
        const matchOnName = project.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        const matchOnKeyword = project.keywords.some(keyword => {
          console.log(keyword.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)
          return keyword.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
        })
        return matchOnName || matchOnKeyword;
      });
    } else {
      this.searchFilterdProjects = this.filteredProjects;
    }
  }

  // Filter projects according to the selected field in the filterbar
  filterFields(fieldId: number | null) {
    if (fieldId != null) {
      this.filteredProjects = this.projects.filter(project => project.fields.some(field => field.id === fieldId))
    } else {
      this.filteredProjects = this.projects;
    }
    this.searchFilterdProjects = this.filteredProjects;
  }

  getFields() {
    this.fieldService.getFields()
      .subscribe((data: Field[]) => {
        this.fields = data;
      });
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe((data: Project[]) => {
        this.projects = data;
        this.filteredProjects = data;
        this.searchFilterdProjects = data;
      });
  }
}
