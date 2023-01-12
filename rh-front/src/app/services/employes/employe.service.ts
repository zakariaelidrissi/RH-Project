import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';
import { Employe } from 'src/app/models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url = "http://localhost:8090/";
  g_emp_url = "http://localhost:8082/employes/";

  constructor(private httpClient : HttpClient) { }

  getAllAttByUserId(userId : number) : Observable<DemandeAttestationResponse[]> {
    return this.httpClient.get<DemandeAttestationResponse[]>(this.url + 'employe/getAtt/' + userId);
  }

  getEmpByUserId(userId : number) : Observable<Employe> {
    return this.httpClient.get<Employe>(this.g_emp_url + 'userId/' + userId );
  }

}
