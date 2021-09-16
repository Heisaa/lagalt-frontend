import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectIdFromUrl: number | undefined;
  project?: Project;

  constructor(
    private route: ActivatedRoute, 
    private readonly projectService: ProjectsService,
    ) {}

  ngOnInit(): void {
    this.projectIdFromUrl = Number(this.route.snapshot.paramMap.get("id"));
    this.getProject(this.projectIdFromUrl);
  }

  getProject(id: number) {
    this.projectService.getProject(id)
      .subscribe((data: Project) => {
        this.project = data;
        console.log("anrop");
        
        console.log(data)
      });
  }

}
