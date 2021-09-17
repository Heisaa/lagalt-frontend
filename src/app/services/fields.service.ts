import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Field } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  private fieldsUrl = environment.apiUrl + "Fields";

  constructor(private readonly http: HttpClient) { }

  getFields() {
    return this.http.get<Field[]>(this.fieldsUrl);
  }
}
