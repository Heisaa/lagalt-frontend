import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  fieldsUrl = "http://localhost:3000/fields";

  constructor(private http: HttpClient) { }

  getFields() {
    return this.http.get<Field>(this.fieldsUrl);
  }
}
