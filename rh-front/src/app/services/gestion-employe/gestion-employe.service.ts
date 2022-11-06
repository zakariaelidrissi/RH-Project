import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Employe } from 'src/app/models/employe';

@Injectable({
  providedIn: 'root'
})
export class GestionEmployeService {

  url : string = "http://localhost:8082/employes";
  // url : string = "http://localhost:8888/GESTION-EMPLOYE-SERVICE/employe";

  constructor(private httpClient : HttpClient) { }

  getAllEmploye() : Observable<Employe[]>{
    return this.httpClient.get<Employe[]>(this.url);
  }

  getEmployeByCin(cin : string) : Observable<Employe> {
    return this.httpClient.get<Employe>(this.url + "/cin/" + cin);
  }

  addEmploye(newEmploye : Employe) : Observable<Employe> {
    return this.httpClient.post<Employe>(this.url, newEmploye);
  }

  updateEmploye(updateEmploye:Employe): Observable<Employe>{
    return this.httpClient.put<Employe>(this.url, updateEmploye);
  }

  deleteEmploye(employeID:number): Observable<any>{
    return this.httpClient.delete<Employe>(this.url + "/"+ employeID);
  }

}
