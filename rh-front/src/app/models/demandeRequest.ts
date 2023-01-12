export class DemandeRequest {
    id : number;
    dateDebut : Date;
    dateFin : Date;
    natureAbsence : string;
    justificatif : string;
    statut : string;
    employeId : number;

    constructor() {
        this.id = 0;
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.statut ='';
        this.employeId = 0;
    }
}