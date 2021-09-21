import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-project-page',
    templateUrl: './create-project-page.component.html',
    styleUrls: ['./create-project-page.component.css']
})
export class CreateProjectPageComponent  {

    onSubmit(event: any) {
        console.log("Submited with a name of:", event.target.inputProjectName.value)
    }
}