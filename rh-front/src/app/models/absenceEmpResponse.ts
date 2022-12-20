import { Employe } from "./employe";

export class AbsenceEmpResponse {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : string;
    duree : string;
    employeId : number;
    employe : Employe;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.duree = '';
        this.employeId = 0;
        this.employe = new Employe();
    }
}