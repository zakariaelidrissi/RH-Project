export class AbsenceEmpRequest {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : string;
    duree : string;
    employeId : number;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.duree = '';
        this.employeId = 0;
    }
}