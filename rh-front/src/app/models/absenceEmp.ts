export class AbsenceEmp {

    id : number;
    dateAbs : string;
    natureAbsence : string;
    justificatif : string;
    duree : string;
    status : string;
    userId : number;
    userName : string;

    constructor() {
        this.id = 0;
        this.dateAbs = '';
        this.natureAbsence = '';
        this.justificatif = '';
        this.duree = '';
        this.status = '';
        this.userId = 0;
        this.userName = '';
    }
}