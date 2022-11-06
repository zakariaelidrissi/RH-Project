import { Stagiaire } from "./stagiaire";

export class AbsenceStgResponse {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : string;
    duree : string;
    stagiaireId : number;
    stagiaire : Stagiaire;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.duree = '';
        this.stagiaireId = 0;
        this.stagiaire = new Stagiaire();
    }
}