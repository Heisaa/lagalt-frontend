import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page-folder/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page-folder/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page-folder/project-page/project-page.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateProjectPageComponent } from './components/create-project-page/create-project-page.component';
import { EditProfilePageComponent } from './components/profile-page-folder/edit-profile-page/edit-profile-page.component';


const routes: Routes = [
  
  {
    path: "profile/:id",
    component: ProfilePageComponent,
  },
  {
    path: "project/:id",
    component: ProjectPageComponent,
  },
  {
    path: "create-project",
    component: CreateProjectPageComponent
  },
  {
    path: "",
    component: MainPageComponent,
    pathMatch: 'full'
  },

  {
    path: "profile/edit/:id", 
    component: EditProfilePageComponent,
  },

  // {
  //   path: "**",
  //   redirectTo: "",
  //   component: MainPageComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
