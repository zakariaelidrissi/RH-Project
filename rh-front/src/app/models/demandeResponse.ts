import { Employe } from "./employe";

export class DemandeResponse {
    id : number;
    dateDebut : Date;
    dateFin : Date;
    natureAbsence : string;
    employeId : number;
    employe : Employe;

    constructor() {
        this.id = 0;
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.natureAbsence = '';
        this.employeId = 0;
        this.employe = new Employe();
    }
}