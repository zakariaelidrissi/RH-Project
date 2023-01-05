import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffreStage } from 'src/app/models/offreStage';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  // url : string = "http://localhost:8089/offre/stages";
  url : string = "http://localhost:8888/OFFRE-STAGE-SERVICE/offre/stages";

  constructor(private httpClient : HttpClient) { }

  getAllStages() : Observable<OffreStage[]> {
    return this.httpClient.get<OffreStage[]>(this.url);
  }

  getStageById(stageId : number) : Observable<OffreStage> {
    return this.httpClient.get<OffreStage>(this.url + "/" + stageId);
  }

  addOffreStage(newOffre : OffreStage) : Observable<OffreStage> {
    return this.httpClient.post<OffreStage>(this.url, newOffre);
  }

  updateStage(updStage : OffreStage) : Observable<OffreStage> {
    return this.httpClient.put<OffreStage>(this.url, updStage);
  }

  delateStage(stageId : number) : Observable<any> {
    return this.httpClient.delete(this.url + "/" + stageId);
  }

}
