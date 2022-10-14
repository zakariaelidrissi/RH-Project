import { Employe } from "./employe";

export class AbsenceResponse {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    EmployeId : number;
    employe : Employe;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.EmployeId = 0;
        this.employe = new Employe();
    }
}