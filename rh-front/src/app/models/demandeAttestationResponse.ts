import { DemandeAttestationEtat } from "./demandeAttestationEtat";
import { DemandeAttestationType } from "./demandeAttestationType";
import { Employe } from "./employe";
import { Stagiaire } from "./stagiaire";
import { User } from "./user";

export class DemandeAttestationResponse {
    id: number;
    userId;
    type: DemandeAttestationType;
    date: Date;
    etat: DemandeAttestationEtat;

    user: User;

    stagiaire: Stagiaire | undefined;
    employe: Employe | undefined;

    constructor() {
        this.id = 0;
        this.userId = 0;
        this.etat = DemandeAttestationEtat.Waiting;
        this.type = DemandeAttestationType.Stage;
        this.date = new Date();
        this.user = new User();
    }
}