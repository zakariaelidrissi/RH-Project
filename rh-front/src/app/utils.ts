import { KeycloakService } from "keycloak-angular";
import { MessagerieService } from "./services/messagerie/messagerie.service";

export const ADM = "ADMIN";
export const EMP = "EMPLOYER";
export const USR = "USER";
export const STG = "STAGIAIRE";

export const getCurrentUserByEmail = async (messagerieService: MessagerieService, email: string) => {
    const user = await messagerieService.getUserByEmail(email).toPromise();
    return user ? user : Promise.reject("No User Found");
}
export const isCurrentUserAnAdmin = (kcService: KeycloakService) => {
    return currentUserHasRole(kcService, ADM);
}
export const isCurrentUserAnEmplyee = (kcService: KeycloakService) => {
    return currentUserHasRole(kcService, EMP);
}
export const isCurrentUserAStagiaire = (kcService: KeycloakService) => {
    return currentUserHasRole(kcService, STG);
}
export const currentUserHasRole = (kcService: KeycloakService, role: string) => {
    return kcService.isUserInRole(role);
}

