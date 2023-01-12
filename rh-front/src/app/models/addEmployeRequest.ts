import { Departement } from "./enums/departement";
import { Etablissement } from "./enums/etablissement";
import { Poste } from "./enums/poste";

export class AddEmployeRequest {

    nom?: string;
    prenom?: string;
    cin?: string;
    email?: string;
    naissance?: Date;
    tel?: string;
    debutAmbauche?: Date;

    genre?: string = "homme";
    departement?: Departement = Departement.Informatique;
    poste?: Poste = Poste.Doyen;
    etablissement?: Etablissement = Etablissement.Fs;

    // constructor() {
    //     this.id = 0;
    //     this.debutAmbauche = new Date();
    //     this.departement = Departement.Info;
    //     this.userId = 0;
    //     this.poste = Poste.Doyen;
    //     this.etablissement = Etablissement.Ensam;
    // }
}