import { Component, Input, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  @Input() fields: Field[] = [];
  @Output() fieldFilterEvent = new EventEmitter<number | null>();
  @Output() searchEvent = new EventEmitter<string>();
  searchWord = "";
  
  constructor() { }

  onFieldChange(event: any) {
    if (event.target.value === "all") {
      this.fieldFilterEvent.emit(null);
    } else {
      this.fieldFilterEvent.emit(Number(event.target.value));
    }
  }

  searchChange(search: string) {
    this.searchEvent.emit(search);
  }

  ngOnInit(): void {
  }

}
