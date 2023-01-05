import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{

    constructor(private router:Router,private kcService: KeycloakService){}

    async canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
        var roles = await this.kcService.getUserRoles();
        if (!route.data["role"] || roles.includes(route.data["role"])){return true;}
        this.router.navigate(['/home'])
        return false;
    }

}