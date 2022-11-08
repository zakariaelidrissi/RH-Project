import { Employe } from "./employe";

export class DemandeResponse {
    id ?: number;
    dateDebut ?: Date;
    dateFin ?: Date;
    natureAbsence ?: string;
    justificatif ?: string;
    statut ?: string;
    employeId ?: number;
    employe : Employe;
    
    constructor() {
        this.employe = new Employe();
    }
}