import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private kcService: KeycloakService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!(await this.kcService.isLoggedIn())) return this.navigateHome();
        var roles = await this.kcService.getUserRoles();
        const role: string | string[] = route.data["role"];
        console.log({role});
        
        if (!role || this.canAccess(roles, role)) { return true; }
        return this.navigateHome();
    }
    navigateHome() {
        this.router.navigate(['/home']);
        return false;
    }
    canAccess(roles: string[], allowedRoles: string | string[]) {
        console.log({roles});
        
        if (allowedRoles instanceof String) {
            allowedRoles = [allowedRoles as string];
        }
        const inter = roles.filter(r => allowedRoles.includes(r));
        console.log({ inter })
        return inter.length !== 0;
    }

}