import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { Project } from 'src/app/models/project.model';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  fields: Field[] = [];
  projects: Project[] = [];

  constructor(private readonly fieldService: FieldsService) { }

  filterFields(fieldId: number | null) {
    console.log(fieldId);
  }

  getFields() {
    this.fieldService.getFields()
      .subscribe((data: Field[]) => {
        this.fields = data;
      })
  }

  ngOnInit(): void {
    this.getFields();
  }

}
