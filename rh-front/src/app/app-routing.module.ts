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

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "attestations", component: AttestationsComponent },
  { path: "demande-attestations", component: DemandeAttestationsComponent },
  { path: "demande-formations", component: DemandeFormationsComponent },
  { path: "dash", component: DashBodyComponent },
  { path: "formations", component: FormationsComponent },
  { path: "plans", component: PlansComponent },
  { path: "gestion-employer", component: GestionEmployerComponent },
  { path: "gestion-stagiaire", component: GestionStagiaireComponent },
  { path: "employe/absence", component: EmployeAbsComponent },
  { path: "demande/absence", component: DemandeAbsenceComponent },
  { path: "stagiaire/absence", component: StagiaireComponent },
  { path: "stages", component: StagesComponent },
  { path: "employes/formations", component: EmployeFormationsComponent },
  { path: "employes/absences", component: EmployeAbsencesComponent },
  { path: "employes/demande/formation", component: DemandeFormationComponent },
  { path: "employes/demande/absence", component: DemandeAbsenceComponent },
  { path: "employes/demande/attestations", component: EmployeAttestationsComponent },
  { path: "**", component: ErrorComponent },
  { path: "messagerie", component: MessagerieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
