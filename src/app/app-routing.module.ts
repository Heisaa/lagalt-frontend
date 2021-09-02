import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';

const routes: Routes = [
  {
    path:"",
    component: MainPageComponent,
  },
  {
    path:"profile",
    component: ProfilePageComponent,
  },
  {
    path:"project",
    component: ProjectPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
