import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormationsComponent } from './components/formations/formations.component';
import { DashBodyComponent } from './components/dash-body/dash-body.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FormationDetailsComponent } from './components/formation-details/formation-details.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormationService } from './services/formation/formation.service';
import { PlansComponent } from './components/plans/plans.component';
import { GestionEmployerComponent } from './components/gestion-employer/gestion-employer.component';
import { GestionEmployeService } from './services/gestion-employe/gestion-employe.service';
import { ErrorComponent } from './components/error/error.component';
import { EmployeComponent } from './components/absence/employe/employe.component';
import { StagiaireComponent } from './components/absence/stagiaire/stagiaire.component';
import { GestionStagiaireComponent } from './components/gestion-stagiaire/gestion-stagiaire.component';
import { DemandeAbsenceComponent } from './components/absence/demande-absence/demande-absence.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormationsComponent,
    DashBodyComponent,
    HomeComponent,
    NavbarComponent,
    FormationDetailsComponent,
    FooterComponent,
    PlansComponent,
    GestionEmployerComponent,
    ErrorComponent,
    EmployeComponent,
    StagiaireComponent,
    GestionStagiaireComponent,
    DemandeAbsenceComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FormationService, GestionEmployeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
