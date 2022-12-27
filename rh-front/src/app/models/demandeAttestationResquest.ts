import { DemandeAttestationEtat } from "./demandeAttestationEtat";
import { DemandeAttestationType } from "./demandeAttestationType";
import { Employe } from "./employe";
import { Stagiaire } from "./stagiaire";
import { User } from "./user";

export class DemandeAttestationRequest {
    userId: number;
    type: DemandeAttestationType;

    constructor() {
        this.userId = 0;
        this.type = DemandeAttestationType.Stage;
    }
}