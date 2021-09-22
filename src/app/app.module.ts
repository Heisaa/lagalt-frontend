import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page-folder/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page-folder/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page-folder/project-page/project-page.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './components/header/header.component';
import { FilterBarComponent } from './components/main-page-folder/filter-bar/filter-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectBannerComponent } from './components/project-banner/project-banner.component';
import { MyProjectsMainComponent } from './components/my-projects-main/my-projects-main.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectItem } from './components/profile-page-folder/project-item/project-item.component';
import { PortfolioListItemComponent } from './components/profile-page-folder/portfolio-list-item/portfolio-list-item.component';
import { PhotoDisplayComponent } from './components/project-page-folder/photo-display/photo-display.component';
import { MessageBoardComponent } from './components/project-page-folder/message-board/message-board.component';
import { MessageItemComponent } from './components/project-page-folder/message-item/message-item.component';
import { CreateProjectPageComponent } from './components/create-project-page/create-project-page.component';
import { ApproveApplicationsComponent } from './components/project-page-folder/approve-applications/approve-applications.component';
import { EditProfilePageComponent } from './components/profile-page-folder/edit-profile-page/edit-profile-page.component';



function initializeKeycloak(keycloak: KeycloakService) {
  const AUTH_URL = 'https://keycloak-auth-lagalt.herokuapp.com/auth';
  
  return () =>
    keycloak.init({
      config: {
        url: AUTH_URL,
        realm: 'lagalt',
        clientId: 'lagalt',
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,

        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
       
      },
      // enableBearerInterceptor: true,
      // bearerPrefix: 'Bearer',
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProfilePageComponent,
    ProjectPageComponent,
    HeaderComponent,
    FilterBarComponent,
    ProjectBannerComponent,
    MyProjectsMainComponent,
    EditProfilePageComponent,
    ProjectItem,
    PortfolioListItemComponent,
    PhotoDisplayComponent,
    MessageBoardComponent,
    MessageItemComponent,
    CreateProjectPageComponent,
    ApproveApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
