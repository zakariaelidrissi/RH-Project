import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceStgRequest } from 'src/app/models/absenceStgRequest';
import { AbsenceStgResponse } from 'src/app/models/absenceStgResponse';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  urlAbs : string = "http://localhost:8085/";
  urlDm : string = "http://localhost:8085/demandes";
  // urlDiscovery : string = "http://localhost:8888/FORMATION-SERVICE/";

  constructor(private httpClient : HttpClient) { }

  // ************************ Emp ***************************

  getEmpAbsences() : Observable<AbsenceEmpResponse[]> {
    return this.httpClient.get<AbsenceEmpResponse[]>(this.urlAbs + 'absences');
  }

  getEmpAbsByDate(date : Date) : Observable<AbsenceEmpResponse[]> {
    return this.httpClient.get<AbsenceEmpResponse[]>(this.urlAbs + "absences/date/" + date);
  }

  getDemandes() : Observable<DemandeResponse> {
    return this.httpClient.get<DemandeResponse>(this.urlDm);
  }

  addEmpAbsence(newAbs : AbsenceEmpRequest) : Observable<AbsenceEmpRequest> {    
    return this.httpClient.post<AbsenceEmpRequest>(this.urlAbs+'absences', newAbs);
  }

  addDemande(newDm : DemandeRequest) : Observable<DemandeRequest> {
    return this.httpClient.post<DemandeRequest>(this.urlDm, newDm);
  }

  updateEmpAbs(updAbs : AbsenceEmpRequest) : Observable<AbsenceEmpRequest> {
    return this.httpClient.put<AbsenceEmpRequest>(this.urlAbs + "absences", updAbs);  
  }

  updateDm(updDm : DemandeRequest) : Observable<DemandeRequest> {
    return this.httpClient.put<DemandeRequest>(this.urlDm, updDm);
  }

  deleteEmpAbs( id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlAbs + "absences/" + id);
  }

  deleteDm( id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlDm + "/" + id);
  }

  // ************************ Stg ***************************

  getStgAbsences() : Observable<AbsenceStgResponse[]> {
    return this.httpClient.get<AbsenceStgResponse[]>(this.urlAbs + "absences/stg");
  }

  getStgAbsByDate(date : Date) : Observable<AbsenceStgResponse[]> {
    return this.httpClient.get<AbsenceStgResponse[]>(this.urlAbs + "absences/stg/date/" + date);
  }

  addStgAbsence(newAbs : AbsenceStgRequest) : Observable<AbsenceStgRequest> {    
    return this.httpClient.post<AbsenceStgRequest>(this.urlAbs+'absences/stg', newAbs);
  }

  updateStgAbs(updAbs : AbsenceStgRequest) : Observable<AbsenceStgRequest> {
    return this.httpClient.put<AbsenceStgRequest>(this.urlAbs + "absences/stg", updAbs);  
  }

  deleteStgAbs( id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlAbs + "absences/stg/" + id);
  }

}
