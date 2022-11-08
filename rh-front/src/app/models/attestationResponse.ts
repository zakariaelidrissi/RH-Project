export class AttestationResponse {
    id: number;
    nom:String;
    cin:String;
    debutPoste:Date;
    poste:string;//Attestation.Poste ;
    etablissement:string;
    type:string;
    constructor() {
        this.id = 0;
        this.nom = "";
        this.cin = "";
        this.debutPoste = new Date();
        this.poste = "";//Attestation.Poste ;
        this.etablissement = "";
        this.type = "";
    }
}