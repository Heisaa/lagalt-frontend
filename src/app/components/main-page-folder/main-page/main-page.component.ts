import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Field } from 'src/app/models/field.model';
import { Project, ProjectPage } from 'src/app/models/project.model';
import { FieldsService } from 'src/app/services/fields.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;
  fields: Field[] = [];
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchFilterdProjects: Project[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  showRight = false;

  constructor(
    private readonly fieldService: FieldsService,
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService
  ) { }


  async ngOnInit() {
    this.getFields();
    // Get paginated projects
    this.getProjects(this.currentPage, this.itemsPerPage);
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  pageChanged(event: any) {
    // Get a new page based on selection in frontend
    this.currentPage = Number(event)
    this.getProjects(this.currentPage, this.itemsPerPage);
  }

  filterSearch(search: string) {
    if (search.length > 0) {
      this.searchFilterdProjects = this.filteredProjects.filter(project => {
        const matchOnName = project.projectName.toLowerCase().indexOf(search.toLowerCase()) >= 0;
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
      this.filteredProjects = this.projects.filter(project => project.fields.some(field => field.fieldId === fieldId))
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

  getProjects(page: number, limit: number) {
    this.projectService.getProjects(page, limit)
      .subscribe((data: ProjectPage) => {
        this.projects = data.projects;
        this.filteredProjects = data.projects;
        this.searchFilterdProjects = data.projects;

        this.currentPage = data.pageNumber;
        this.totalItems = data.count;
        this.itemsPerPage = data.pageSize;
      });
  }
}
