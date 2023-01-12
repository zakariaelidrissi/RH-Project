import { Employe } from "./employe";

export class DemandeResponse {
    id : number;
    dateDebut : Date;
    dateFin : Date;
    natureAbsence : string;
    justificatif : string;
    statut : string;
    employeId : number;
    employe : Employe;
    
    constructor() {
        this.id = 0;
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.statut = '';
        this.employeId = 0;
        this.employe = new Employe();
    }
}