import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/project.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
