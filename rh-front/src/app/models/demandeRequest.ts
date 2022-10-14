export class DemandeRequest {
    id : number;
    dateDebut : Date;
    dateFin : Date;
    natureAbsence : string;
    employeId : number;

    constructor() {
        this.id = 0;
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.natureAbsence = '';
        this.employeId = 0;
    }
}