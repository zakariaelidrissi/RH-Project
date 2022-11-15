import { Employe } from "./employe";
import { Stagiaire } from "./stagiaire";

export class DemandeAttestationResponse {
    id: number;
    idUser: number;
    etablissement: String;
    type: String;
    poste: string;
    date: Date;
    etat: string;
    done: boolean;

    stagiaire!: Stagiaire;
    employe!: Employe;

    constructor() {
        this.id = 0;
        this.idUser = 0;
        this.poste = "";
        this.etablissement = "";
        this.etat = "";
        this.type = "";
        this.date = new Date();
        this.done = false;
    }
}