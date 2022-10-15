import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { PlanResponse } from 'src/app/models/planResponse';
import { PlanRequest } from 'src/app/models/planRequest';
import { AddById } from 'src/app/models/addById';
import { FormationResponse } from 'src/app/models/formationResponse';
import { FormationRequest } from 'src/app/models/formationRequest';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  url : string = "http://localhost:8083/";
  // urlDiscovery : string = "http://localhost:8888/FORMATION-SERVICE/";

  constructor(private httpClient: HttpClient) { }

  // **************** Formations ********************

  getFormations() : Observable<FormationResponse[]>{
    return this.httpClient.get<FormationResponse[]>(this.url + "listFormations");
  }  

  addFormation(newFormation : FormationRequest) : Observable<FormationRequest> {
    return this.httpClient.post<FormationRequest>(this.url + "addFormation", newFormation);
  }

  updateFormation(updateFormation:FormationRequest): Observable<FormationRequest>{
    return this.httpClient.put<FormationRequest>(this.url + "updateFormation/" + updateFormation.id, updateFormation);
  }

  deleteFormation(formationID:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + "deleteFormation/" + formationID);
  }

  findFormation(searchTerm : string): Observable<FormationResponse>{
    return this.httpClient.get<FormationResponse>("" + searchTerm);
  }

  // **************** Plans ********************

  getPlans() : Observable<PlanResponse[]>{
    return this.httpClient.get<PlanResponse[]>(this.url + "listPlans");
  }

  addPlan(newPlan : PlanRequest) : Observable<PlanRequest> {
    return this.httpClient.post<PlanRequest>(this.url + "addPlan", newPlan);
  }

  updatePlan(updatePlan:PlanRequest): Observable<PlanRequest>{
    return this.httpClient.put<PlanRequest>(this.url + "updatePlan/" + updatePlan.id, updatePlan);
  }

  deletePlan(planID:number): Observable<any>{
    return this.httpClient.delete<PlanRequest>(this.url + "deletePlan/" + planID);
  }

  getPlanById(planID:number) : Observable<PlanResponse>{
    return this.httpClient.get<PlanResponse>(this.url + "listPlans/" + planID);
  }

  // **************** Add Formation To Plan ********************

  addFormationToPlan(newFormationToPlan : AddById) : Observable<AddById> {
    return this.httpClient.post<AddById>(this.url + "addFormationToPlan", newFormationToPlan);
  }

  deleteFormationFromPlan(formationId : Number, planId : number) : Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteFormationFromPlan/" + formationId + "/" + planId);
  }
  
}
