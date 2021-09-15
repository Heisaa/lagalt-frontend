import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './components/header/header.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectBannerComponent } from './components/project-banner/project-banner.component';
import { MyProjectsMainComponent } from './components/my-projects-main/my-projects-main.component';
import { NgxPaginationModule } from 'ngx-pagination';

function initializeKeycloak(keycloak: KeycloakService) {
  const AUTH_URL = 'https://keycloak-auth-lagalt.herokuapp.com/auth';
  
  return () =>
    keycloak.init({
      config: {
        url: AUTH_URL,
        realm: 'lagalt',
        clientId: 'lagaltAPI',
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
