import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-approve-applications',
  templateUrl: './approve-applications.component.html',
  styleUrls: ['./approve-applications.component.css']
})
export class ApproveApplicationsComponent implements OnInit {
  @Input() project: Project | undefined;
  @Input() notApprovedApplications: Application[] | undefined;
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  submitApprovals() {

  }

  closeModal() {
    this.closeEvent.emit(false);
  }
}
