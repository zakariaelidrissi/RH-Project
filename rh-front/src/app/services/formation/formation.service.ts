import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Formation } from 'src/app/models/formation';
import { PlanResponse } from 'src/app/models/planResponse';
import { PlanRequest } from 'src/app/models/planRequest';
import { AddById } from 'src/app/models/addById';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  url : string = "http://localhost:8083/";
  // urlDiscovery : string = "http://localhost:8888/FORMATION-SERVICE/";

  constructor(private httpClient: HttpClient) { }

  // **************** Formations ********************

  getFormations() : Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(this.url + "listFormations");
  }  

  addFormation(newFormation : Formation) : Observable<Formation> {
    return this.httpClient.post<Formation>(this.url + "addFormation", newFormation);
  }

  updateFormation(updateFormation:Formation): Observable<Formation>{
    return this.httpClient.put<Formation>(this.url + "updateFormation/" + updateFormation.id, updateFormation);
  }

  deleteFormation(formationID:number): Observable<any>{
    return this.httpClient.delete<Formation>(this.url + "deleteFormation/" + formationID);
  }

  findFormation(searchTerm : string): Observable<Formation>{
    return this.httpClient.get<Formation>("" + searchTerm);
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
