export class AbsenceEmpRequest {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    employeId : number;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.employeId = 0;
    }
}