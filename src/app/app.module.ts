import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './components/header/header.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterFieldsPipe } from './pipes/filter-fields.pipe';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak-auth-lagalt.herokuapp.com/auth',
        realm: 'lagalt',
        clientId: 'lagalt',
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25

        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
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
    FilterFieldsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule
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
