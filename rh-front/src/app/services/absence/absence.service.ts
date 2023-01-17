import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceStgRequest } from 'src/app/models/absenceStgRequest';
import { AbsenceStgResponse } from 'src/app/models/absenceStgResponse';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';
import { AbsenceEmp } from 'src/app/models/absenceEmp';
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  urlAbs: string = "http://localhost:8086/";
  urlDm: string = "http://localhost:8086/demandes";
  // urlAbs : string = "http://localhost:8888/ABSENCE-SERVICE/";
  // urlDm : string = "http://localhost:8888/ABSENCE-SERVICE/demandes";

  constructor(private httpClient: HttpClient) { }

  // ************************ Employe Absence **************************

  getEmpAbsences(): Observable<AbsenceEmpResponse[]> {
    return this.httpClient.get<AbsenceEmpResponse[]>(this.urlAbs + 'absences');
  }

  getEmpAbsencesById(empId: number): Observable<AbsenceEmpResponse[]> {
    return this.httpClient.get<AbsenceEmpResponse[]>(this.urlAbs + 'absences/' + empId);
  }

  getEmpAbsByDate(date: string): Observable<AbsenceEmp[]> {
    // var dt = date.toLocaleDateString();
    return this.httpClient.get<AbsenceEmp[]>(this.urlAbs + "absences/date/" + date);
  }

  addEmpAbsence(newAbs: AbsenceEmpRequest): Observable<AbsenceEmpRequest> {
    return this.httpClient.post<AbsenceEmpRequest>(this.urlAbs + 'absences', newAbs);
  }

  updateEmpAbs(updAbs: AbsenceEmpRequest): Observable<AbsenceEmpRequest> {
    return this.httpClient.put<AbsenceEmpRequest>(this.urlAbs + "absences", updAbs);
  }

  deleteEmpAbs(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlAbs + "absences/" + id);
  }

  // *********************** Demandes Absence ****************************

  getDemandes(): Observable<DemandeResponse[]> {
    return this.httpClient.get<DemandeResponse[]>(this.urlDm);
  }

  getDmByEmpId(id: number): Observable<DemandeResponse[]> {
    return this.httpClient.get<DemandeResponse[]>(this.urlDm + '/abs/' + id);
  }

  addDemande(newDm: DemandeRequest): Observable<DemandeResponse> {
    return this.httpClient.post<DemandeResponse>(this.urlDm, newDm);
  }
  uploadJustficatif(data: FormData): Observable<DemandeResponse> {
    return this.httpClient.post<DemandeResponse>(this.urlDm + "/upload-justficatif", data);
  }

  updateDm(updDm: DemandeRequest): Observable<DemandeRequest> {
    return this.httpClient.put<DemandeRequest>(this.urlDm, updDm);
  }

  deleteDm(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlDm + "/" + id);
  }

  // ************************ Stagiaire Absence **************************

  getStgAbsences(): Observable<AbsenceStgResponse[]> {
    return this.httpClient.get<AbsenceStgResponse[]>(this.urlAbs + "absences/stg");
  }

  getStgAbsencesById(stgId: number): Observable<AbsenceStgResponse[]> {
    return this.httpClient.get<AbsenceStgResponse[]>(this.urlAbs + 'absences/stg/' + stgId);
  }

  getStgAbsByDate(date: string): Observable<AbsenceEmp[]> {
    return this.httpClient.get<AbsenceEmp[]>(this.urlAbs + "absencesStg/date/" + date);
  }

  addStgAbsence(newAbs: AbsenceStgRequest): Observable<AbsenceStgRequest> {
    return this.httpClient.post<AbsenceStgRequest>(this.urlAbs + 'absences/stg', newAbs);
  }

  updateStgAbs(updAbs: AbsenceStgRequest): Observable<AbsenceStgRequest> {
    return this.httpClient.put<AbsenceStgRequest>(this.urlAbs + "absences/stg", updAbs);
  }

  deleteStgAbs(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlAbs + "absences/stg/" + id);
  }

}
