import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
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
  fields: Field[] = [];
  projects: Project[] = [];

  constructor(
    private readonly fieldService: FieldsService, 
    private readonly projectService: ProjectsService
    ) { }

    
  ngOnInit(): void {
    this.getFields();
    this.getProjects();
  }

  filterFields(fieldId: number | null) {
    console.log(fieldId);
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
      });
  }

}
