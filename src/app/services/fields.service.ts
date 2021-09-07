import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  private fieldsUrl = "http://localhost:3000/fields";

  constructor(private readonly http: HttpClient) { }

  getFields() {
    return this.http.get<Field[]>(this.fieldsUrl);
  }
}
