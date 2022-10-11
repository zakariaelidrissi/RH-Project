import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Collaborateur } from 'src/app/models/collaborateur';

@Injectable({
  providedIn: 'root'
})
export class CollService {

  url : string = "http://localhost:8083/";

  constructor(private httpClient : HttpClient) { }

  getCollaborateur() : Observable<Collaborateur[]>{
    return this.httpClient.get<Collaborateur[]>(this.url + "listCollaborateurs");
  }

}
