import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeAbsenceComponent } from './components/absence/demande-absence/demande-absence.component';
import { EmployeAbsComponent } from './components/absence/employe-abs/employe-abs.component';
import { StagiaireComponent } from './components/absence/stagiaire/stagiaire.component';
import { AttestationsComponent } from './components/attestations/attestations.component';
import { DashBodyComponent } from './components/dash-body/dash-body.component';
import { ErrorComponent } from './components/error/error.component';
import { FormationsComponent } from './components/formations/formations.component';
import { GestionEmployerComponent } from './components/gestion-employer/gestion-employer.component';
import { GestionStagiaireComponent } from './components/gestion-stagiaire/gestion-stagiaire.component';
import { HomeComponent } from './components/home/home.component';
import { PlansComponent } from './components/plans/plans.component';
import { StagesComponent } from './components/stages/stages.component';
import { DemandeAttestationsComponent } from './components/demande-attestations/demande-attestations.component';
import { EmployeFormationsComponent } from './components/employes/employe-formations/employe-formations.component';
import { EmployeAbsencesComponent } from './components/employes/employe-absences/employe-absences.component';
import { DemandeFormationComponent } from './components/employes/demande-formation/demande-formation.component';
import { DemandeFormationsComponent } from './components/demande-formations/demande-formations.component';
import { EmployeAttestationsComponent } from './components/employes/employe-attestations/employe-attestations.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { AuthGuard } from './guard/authGuard';
import { OffreStageComponent } from './components/offre-stage/offre-stage.component';
import { ADM, EMP, USR } from './utils';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "attestations", component: AttestationsComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "demande-attestations", component: DemandeAttestationsComponent,
    canActivate: [AuthGuard], data: { role: [ADM, EMP] }
  },
  {
    path: "demande-formations", component: DemandeFormationsComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "dash", component: DashBodyComponent,
    canActivate: [AuthGuard], data: { role: [ADM, EMP] }
  },
  {
    path: "formations", component: FormationsComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "plans", component: PlansComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "gestion-employer", component: GestionEmployerComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "gestion-stagiaire", component: GestionStagiaireComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "employe/absence", component: EmployeAbsComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "demande/absence", component: DemandeAbsenceComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "stagiaire/absence", component: StagiaireComponent,
    canActivate: [AuthGuard], data: { role: ADM }
  },
  {
    path: "stages", component: StagesComponent,
    canActivate: [AuthGuard], data: { role: USR }
  },
  { 
    path: "offre-stage", component: OffreStageComponent,
    canActivate:[AuthGuard],data:{role: ADM} 
  },
  {
    path: "employes/formations", component: EmployeFormationsComponent,
    canActivate: [AuthGuard], data: { role: EMP }
  },
  {
    path: "employes/absences", component: EmployeAbsencesComponent,
    canActivate: [AuthGuard], data: { role: EMP }
  },
  {
    path: "employes/demande/formation", component: DemandeFormationComponent,
    canActivate: [AuthGuard], data: { role: EMP }
  },
  {
    path: "employes/demande/absence", component: DemandeAbsenceComponent,
    canActivate: [AuthGuard], data: { role: EMP }
  },
  {
    path: "employes/demande/attestations", component: EmployeAttestationsComponent,
    canActivate: [AuthGuard], data: { role: EMP }
  },
  {
    path: "messagerie", component: MessagerieComponent,
    canActivate: [AuthGuard], data: { role: [EMP, ADM, USR] }
  },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
