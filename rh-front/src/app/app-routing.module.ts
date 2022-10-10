import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeAbsenceComponent } from './components/absence/demande-absence/demande-absence.component';
import { EmployeComponent } from './components/absence/employe/employe.component';
import { StagiaireComponent } from './components/absence/stagiaire/stagiaire.component';
import { DashBodyComponent } from './components/dash-body/dash-body.component';
import { ErrorComponent } from './components/error/error.component';
import { FormationsComponent } from './components/formations/formations.component';
import { GestionEmployerComponent } from './components/gestion-employer/gestion-employer.component';
import { HomeComponent } from './components/home/home.component';
import { PlansComponent } from './components/plans/plans.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "dash", component: DashBodyComponent},
  {path: "formations", component: FormationsComponent},
  {path: "plans", component: PlansComponent},
  {path: "gestion-employer", component: GestionEmployerComponent},
  {path: "employe/absence", component: EmployeComponent},
  {path: "demande/absence", component: DemandeAbsenceComponent},
  {path: "stagiaire/absence", component: StagiaireComponent},
  {path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
