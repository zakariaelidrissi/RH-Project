export class DemandeFormationReq {
    id: number;
    dateDemande: Date;
    employeId: number;
    formationId: number;
    status: string;

    constructor() {
        this.id = 0;
        this.dateDemande = new Date();
        this.employeId = 0;
        this.formationId = 0;
        this.status = '';
    }
}