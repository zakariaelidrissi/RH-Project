import { Injectable } from '@angular/core';
// import { KeycloakInstance } from 'keycloak-js';

declare var Keycloak:any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {

  public kc : any;

  constructor() { }

  init() {
    console.log("Security Initialisation...");
    this.kc = new Keycloak({
      url: "http://localhost:8080/auth",
      realm : "gestion-rh",
      clientId: "AngularGestionRhApp"
    });
    this.kc.init({
      // onLoad: 'login-required'
      onLoad: 'check-sso',
      promiseType: 'native'
    }).then((authenticated:any) => {
      console.log(authenticated);
      // console.log(this.kc.token);
    }, (error: any) => {
      console.log(error);
    });
  }

}
