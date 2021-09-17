import { Component, Input, OnInit } from '@angular/core';
import { Message, Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {
  @Input() project: Project | undefined;
  messages: Message[] | undefined;

  constructor(private readonly projectService: ProjectsService) { }

  ngOnInit(): void {
    if (this.project) {
      this.getMessages(this.project.projectId)
    }
  }

  getMessages(projectId: number) {
    this.projectService.getMessages(projectId)
      .subscribe((data: Message[]) => {
        this.messages = data;
        console.log(data)
      })
  }

}
