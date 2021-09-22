import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectBannerComponent } from '../project-banner/project-banner.component';

export class CreateProject {
    public projectName: string | undefined;
    public description: string | undefined;
    public urlReference: string | undefined;
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


    onSubmit(form :any) {
        console.log("Submited with a name of:", form.value)
    }
}