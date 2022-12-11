import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeFormationServiceService {

  url = "http://localhost:8090/";

  constructor(private httpClient : HttpClient) { }

  
}
