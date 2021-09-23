import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Message, PostMessage, Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {
  @Input() project: Project | undefined;
  messages: Message[] | undefined;
  submittedMessage = "";
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  @Input() memberOfProject: boolean | undefined = false;

  constructor(
    private readonly projectService: ProjectsService,
    private readonly keycloak: KeycloakService,
    ) { }

  async ngOnInit() {
    if (this.project) {
      this.getMessages(this.project.projectId)
    }
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      
    }
  }

  submitMessage() {    
    if (this.project != undefined && this.userProfile?.id != undefined && this.submittedMessage.length > 0) {

      const messageToSubmit: PostMessage = {
        projectId: this.project.projectId,
        userId: this.userProfile.id,
        text: this.submittedMessage,
      }

      this.projectService
        .addMessage(messageToSubmit)
        .subscribe(message => {
          console.log("message was submitted" + message.text)
          if (this.project) {
            this.getMessages(this.project.projectId)
          }
        })

    }
    this.submittedMessage = ""
  }

  getMessages(projectId: number) {
    this.projectService.getMessages(projectId)
      .subscribe((data: Message[]) => {
        this.messages = data;
      })
  }

}
