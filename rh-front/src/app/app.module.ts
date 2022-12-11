import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormationsComponent } from './components/formations/formations.component';
import { DashBodyComponent } from './components/dash-body/dash-body.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormationService } from './services/formation/formation.service';
import { PlansComponent } from './components/plans/plans.component';
import { GestionEmployerComponent } from './components/gestion-employer/gestion-employer.component';
import { GestionEmployeService } from './services/gestion-employe/gestion-employe.service';
import { ErrorComponent } from './components/error/error.component';
import { EmployeComponent } from './components/absence/employe/employe.component';
import { GestionStagiaireComponent } from './components/gestion-stagiaire/gestion-stagiaire.component';
import { DemandeAbsenceComponent } from './components/absence/demande-absence/demande-absence.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CollService } from './services/collaborateur/coll.service';
import { StagiaireService } from './services/gestion-stagiaire/stagiaire.service';
import { AbsenceService } from './services/absence/absence.service';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { StagesComponent } from './components/stages/stages.component';
import { AttestationsComponent } from './components/attestations/attestations.component';
import { StagiaireComponent } from './components/absence/stagiaire/stagiaire.component';
import { KeycloakSecurityService } from './services/keycloak-security/keycloak-security.service';
import { RequestInterceptorService } from './services/keycloak-request/request-interceptor.service';
import { EmployeFormationsComponent } from './components/employes/employe-formations/employe-formations.component';
import { EmployeAbsencesComponent } from './components/employes/employe-absences/employe-absences.component';
import { DemandeFormationComponent } from './components/employes/demande-formation/demande-formation.component';
import { EmployeAbsComponent } from './components/absence/employe-abs/employe-abs.component';
import { DemandeAttestationsComponent } from './components/demande-attestations/demande-attestations.component';

// export function kcFactory(kcSecurity: KeycloakSecurityService) {
//   return () => kcSecurity.init();
// }

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, FormationsComponent, DashBodyComponent,
    HomeComponent, NavbarComponent, FooterComponent, PlansComponent,
    GestionEmployerComponent, ErrorComponent, EmployeComponent,
    GestionStagiaireComponent, DemandeAbsenceComponent, StagiaireComponent,   
    LoginComponent, StagesComponent, AttestationsComponent, EmployeFormationsComponent, EmployeAbsencesComponent, DemandeFormationComponent, EmployeAbsComponent,
    DemandeAttestationsComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(), FormsModule,
    NgxPaginationModule
  ],
  providers: [
    FormationService,
    GestionEmployeService,
    CollService,
    StagiaireService,
    AbsenceService,
    DatePipe,
    // {provide: APP_INITIALIZER, deps: [KeycloakSecurityService], useFactory: kcFactory, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
