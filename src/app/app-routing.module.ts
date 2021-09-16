import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  
  {
    path: "profile/:id",
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "project/:id",
    component: ProjectPageComponent,
  },
  {
    path: "",
    component: MainPageComponent,
    pathMatch: 'full'
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
