import { Stagiaire } from "./stagiaire";

export class AbsenceStgResponse {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    stagiaireId : number;
    stagiaire : Stagiaire;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.stagiaireId = 0;
        this.stagiaire = new Stagiaire();
    }
}