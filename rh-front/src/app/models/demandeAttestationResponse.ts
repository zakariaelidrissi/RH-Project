import { Employe } from "./employe";
import { Stagiaire } from "./stagiaire";
import { User } from "./user";

export class DemandeAttestationResponse {
    id: number;
    userId: number;
    etablissement: String;
    type: String;
    poste: string;
    date: Date;
    etat: string;
    done: boolean;

    stagiaire: Stagiaire | undefined;
    employe: Employe | undefined;
    user: User;

    constructor() {
        this.id = 0;
        this.userId = 0;
        this.poste = "";
        this.etablissement = "";
        this.etat = "";
        this.type = "";
        this.date = new Date();
        this.done = false;
        this.user = new User();
    }
}