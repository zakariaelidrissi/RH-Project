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
    return this.httpClient.get<FormationResponse[]>(this.url + "empFormation/" + employeId);
  }

  getFormations(): Observable<FormationResponse[]> {
    return this.httpClient.get<FormationResponse[]>(this.url + "formations");
  }

  addFormation(newFormation: FormationRequest): Observable<FormationRequest> {
    return this.httpClient.post<FormationRequest>(this.url + "formations", newFormation);
  }

  updateFormation(updateFormation: FormationRequest): Observable<FormationRequest> {
    return this.httpClient.put<FormationRequest>(this.url + "formations", updateFormation);
  }

  deleteFormation(formationID: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "formations/" + formationID);
  }

  // **************** Plans ********************

  getPlans(): Observable<PlanResponse[]> {
    return this.httpClient.get<PlanResponse[]>(this.url + "plans");
  }

  addPlan(newPlan: PlanRequest): Observable<PlanRequest> {
    return this.httpClient.post<PlanRequest>(this.url + "plans", newPlan);
  }

  updatePlan(updatePlan: PlanRequest): Observable<PlanRequest> {
    return this.httpClient.put<PlanRequest>(this.url + "plans", updatePlan);
  }

  deletePlan(planID: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "plans/" + planID);
  }

  getPlanById(planID: number): Observable<PlanResponse> {
    return this.httpClient.get<PlanResponse>(this.url + "plans/" + planID);
  }

  // **************** Formation To Plan ********************

  addFormationToPlan(newFormationToPlan: AddById): Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "addFormationToPlan", newFormationToPlan);
  }

  deleteFormationFromPlan(id: Number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteFormationFromPlan/" + id);
  }

  deleteEmpFromFormation(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteEmpFromFormation/" + id);
  }

  // **************** Emp To Formation ********************

  addEmpToFormation(newEmpToForm: AddById): Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "addEmpToFormation", newEmpToForm);
  }

  // **************** Get All Formation From Plan ********************

  getAllFormFromPlan(idPlan: number): Observable<FormationResponse[]> {
    return this.httpClient.get<FormationResponse[]>(this.url + 'listFormFromPlan/' + idPlan);
  }

  // **************** Get All Plan From Formation ********************

  getAllPlanFromForm(idForm : number) : Observable<PlanResponse[]> {
    return this.httpClient.get<PlanResponse[]>(this.url + "planFormation/" + idForm);
  }

  // **************** Get All Emp From Form ********************
  
  getEmployesByFormationId(idForm: number): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(this.url + 'listEmpFromForm/' + idForm);
  }

  // **************** Demandes ********************

  getAllDemandes(): Observable<DemandeFormationRes[]> {
    return this.httpClient.get<DemandeFormationRes[]>(this.url + "demandes");
  }

  getDemandesByEmpId(empId: number): Observable<DemandeFormationRes[]> {
    return this.httpClient.get<DemandeFormationRes[]>(this.url + "demandes/byEmpId/" + empId);
  }

  getDemandesByFormId(idForm : number) : Observable<DemandeFormationRes[]> {
    return this.httpClient.get<DemandeFormationRes[]>(this.url + "demandes/byFormId/" + idForm);
  }

  addDemande(demandeReq: DemandeFormationReq): Observable<DemandeFormationReq> {
    return this.httpClient.post<DemandeFormationReq>(this.url + "demandes", demandeReq);
  }

  updateDemande(updDemande: DemandeFormationReq): Observable<DemandeFormationReq> {
    return this.httpClient.put<DemandeFormationReq>(this.url + "demandes", updDemande);
  }

  deleteDemande(idDemande : number) : Observable<any> {
    return this.httpClient.delete<any>(this.url + "demandes/" + idDemande);
  }

}
