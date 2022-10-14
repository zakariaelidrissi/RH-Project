import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AbsenceResponse } from 'src/app/models/absenceResponse';
import { AbsenceRequest } from 'src/app/models/absenceRequest';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  urlAbs : string = "http://localhost:8085/absences";
  urlDm : string = "http://localhost:8085/demandes";
  // urlDiscovery : string = "http://localhost:8888/FORMATION-SERVICE/";

  constructor(private httpClient : HttpClient) { }

  getEmpAbsences() : Observable<AbsenceResponse[]> {
    return this.httpClient.get<AbsenceResponse[]>(this.urlAbs);
  }

  getEmpAbsByDate(date : Date) : Observable<AbsenceResponse[]> {
    return this.httpClient.get<AbsenceResponse[]>(this.urlAbs + "/date/" + date);
  }

  getDemandes() : Observable<DemandeResponse> {
    return this.httpClient.get<DemandeResponse>(this.urlDm);
  }

  addEmpAbsence(newAbs : AbsenceRequest) : Observable<AbsenceRequest> {
    return this.httpClient.post<AbsenceRequest>(this.urlAbs, newAbs);
  }

  addDemande(newDm : DemandeRequest) : Observable<DemandeRequest> {
    return this.httpClient.post<DemandeRequest>(this.urlDm, newDm);
  }

  updateEmpAbs(updAbs : AbsenceRequest) : Observable<AbsenceRequest> {
    return this.httpClient.put<AbsenceRequest>(this.urlAbs + "/" + updAbs.id, updAbs);  
  }

  updateDm(updDm : DemandeRequest) : Observable<DemandeRequest> {
    return this.httpClient.put<DemandeRequest>(this.urlDm + "/" + updDm.id, updDm);
  }

  deleteEmpAbs( id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlAbs + "/" + id);
  }

  deleteDm( id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlDm + "/" + id);
  }


}
