import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Employer } from 'src/app/models/employer';

@Injectable({
  providedIn: 'root'
})
export class GestionEmployerService {

  url : string = "http://localhost:8084/employe";
  // urlDiscovery : string = "http://localhost:8888/GESTION-EMPLOYE-SERVICE/";

  constructor(private httpClient : HttpClient) { }

  getAllEmployer() : Observable<Employer[]>{
    return this.httpClient.get<Employer[]>(this.url + "s");
  }

  addEmployer(newEmployer : Employer) : Observable<Employer> {
    return this.httpClient.post<Employer>(this.url, newEmployer);
  }

  updateEmployer(updateEmployer:Employer): Observable<Employer>{
    return this.httpClient.put<Employer>(this.url, updateEmployer);
  }

  deleteEmployer(employerID:number): Observable<any>{
    return this.httpClient.delete<Employer>(this.url + "/"+ employerID);
  }

}
