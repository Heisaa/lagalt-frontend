import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project.model';

@Pipe({
  name: 'filterFields'
})
export class FilterFieldsPipe implements PipeTransform {

  transform(value: Project[], input: number): Project[] {
    return value;
  }

}
