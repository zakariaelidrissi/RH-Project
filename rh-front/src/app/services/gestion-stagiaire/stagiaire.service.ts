import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  url : string = "http://localhost:8083/";

  constructor(private httpClient : HttpClient) { }

  getStagiaire() : Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "stagiaires");
  }

  addStagiaire(newStagiaire : any) : Observable<any> {
    return this.httpClient.post<any>(this.url + "stagiaires", newStagiaire);
  }

  updateStagiaire(updateStagiaire : any) : Observable<any> {
    return this.httpClient.put(this.url + "stagiaires/" + "id", updateStagiaire);
  }

  deleteStagiaire(stagiaireId : number) : Observable<any> {
    return this.httpClient.delete(this.url + "stagiaires/" + stagiaireId);
  }

}
