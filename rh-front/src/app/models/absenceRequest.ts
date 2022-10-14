export class AbsenceRequest {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    EmployeId : number;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.EmployeId = 0;
    }
}