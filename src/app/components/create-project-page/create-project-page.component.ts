import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostProject } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectBannerComponent } from '../project-banner/project-banner.component';

export class CreateProject implements PostProject {
    projectName: string | undefined;
    description: string | undefined;
    urlReference: string | undefined;
}

@Component({
    selector: 'app-create-project-page',
    templateUrl: './create-project-page.component.html',
    styleUrls: ['./create-project-page.component.css']
})
export class CreateProjectPageComponent implements OnInit {

    model = new CreateProject();

    ngOnInit() {
        
    }

    constructor(
        private readonly projectService: ProjectsService,
        
    ) { }


    onSubmit(form :any) {
        this.postProject(this.model)
    }

    postProject(project : PostProject) {
        this.projectService
            .createProject(project)
            .subscribe(p => {
                console.log(p.projectName + " was created")
            })
    }
}