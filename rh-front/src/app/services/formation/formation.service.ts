import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlanResponse } from 'src/app/models/planResponse';
import { PlanRequest } from 'src/app/models/planRequest';
import { AddById } from 'src/app/models/addById';
import { FormationResponse } from 'src/app/models/formationResponse';
import { FormationRequest } from 'src/app/models/formationRequest';
// import { Collaborateur } from 'src/app/models/collaborateur';
import { DemandeFormationRes } from 'src/app/models/demandeFormationRes';
import { DemandeFormationReq } from 'src/app/models/demandeFormationReq';
import { Employe } from 'src/app/models/employe';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  url: string = "http://localhost:8085/";
  // url : string = "http://localhost:8888/FORMATION-SERVICE/";

  constructor(private httpClient: HttpClient) { }

  // **************** Formations ********************
  getFormationsByEmployeId(employeId: number): Observable<FormationResponse[]> {
    return this.httpClient.get<FormationResponse[]>(this.url + "formations/employeId/" + employeId);
  }

  getFormations(): Observable<FormationResponse[]> {
    return this.httpClient.get<FormationResponse[]>(this.url + "formations");
  }

  addFormation(newFormation: FormationRequest): Observable<FormationRequest> {
    return this.httpClient.post<FormationRequest>(this.url + "formations", newFormation);
  }

  updateFormation(updateFormation: FormationRequest): Observable<FormationRequest> {
    return this.httpClient.put<FormationRequest>(this.url + "formations/" + updateFormation.id, updateFormation);
  }

  deleteFormation(formationID: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "formations/" + formationID);
  }

  findFormation(searchTerm: string): Observable<FormationResponse> {
    return this.httpClient.get<FormationResponse>("" + searchTerm);
  }

  // **************** Plans ********************

  getPlans(): Observable<PlanResponse[]> {
    return this.httpClient.get<PlanResponse[]>(this.url + "plans");
  }

  addPlan(newPlan: PlanRequest): Observable<PlanRequest> {
    return this.httpClient.post<PlanRequest>(this.url + "plans", newPlan);
  }

  updatePlan(updatePlan: PlanRequest): Observable<PlanRequest> {
    return this.httpClient.put<PlanRequest>(this.url + "plans/" + updatePlan.id, updatePlan);
  }

  deletePlan(planID: number): Observable<any> {
    return this.httpClient.delete<PlanRequest>(this.url + "plans/" + planID);
  }

  getPlanById(planID: number): Observable<PlanResponse> {
    return this.httpClient.get<PlanResponse>(this.url + "plans/" + planID);
  }

  // **************** Formation To Plan ********************

  addFormationToPlan(newFormationToPlan: AddById): Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "addFormationToPlan", newFormationToPlan);
  }

  deleteFormationFromPlan(formationId: Number, planId: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteFormationFromPlan/" + formationId + "/" + planId);
  }

  deleteCollFromFormation(collId: number, formationId: Number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteCollFromFormation/" + collId + "/" + formationId);
  }

  // **************** Coll To Formation ********************

  addCollToFormation(newCollToForm: AddById): Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "addCollToFormation", newCollToForm);
  }

  deleteCollFromForm(collId: number, formationId: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteCollFromFormation/" + collId + "/" + formationId);
  }

  // **************** Get All Formation From Plan ********************

  getAllFormFromPlan(idPlan: number): Observable<FormationResponse[]> {
    return this.httpClient.get<FormationResponse[]>(this.url + 'listFormFromPlan/' + idPlan);
  }

  // **************** Get All Coll From Form ********************

  // getAllFormationBy(idForm: number): Observable<Collaborateur[]> {
  //   return this.httpClient.get<Collaborateur[]>(this.url + 'listCollFromForm/' + idForm);
  // }
  getEmployesByFormationId(idForm: number): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(this.url + 'listCollFromForm/' + idForm);
  }

  // **************** Demandes ********************

  getAllDemandes(): Observable<DemandeFormationRes[]> {
    return this.httpClient.get<DemandeFormationRes[]>(this.url + "demandes");
  }

  getDemandesByEmpId(empId: number): Observable<DemandeFormationRes[]> {
    return this.httpClient.get<DemandeFormationRes[]>(this.url + "demandes/byColl/" + empId);
  }

  addDemande(addById: AddById): Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "demandes", addById);
  }

  updateDemande(updDemande: DemandeFormationReq): Observable<DemandeFormationReq> {
    return this.httpClient.put<DemandeFormationReq>(this.url + "demandes", updDemande);
  }

}
