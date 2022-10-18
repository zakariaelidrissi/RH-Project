import { Employe } from "./employe";

export class AbsenceEmpResponse {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    employeId : number;
    employe : Employe;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.employeId = 0;
        this.employe = new Employe();
    }
}