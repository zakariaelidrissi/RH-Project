import { Departement } from "./departement";
import { Etablissement } from "./etablissement";
import { User } from "./user";

export class Employe {
    id: number;
    nom: string;
    cin: string;
    email: string;
    naissance: Date;
    debutAmbauche: Date;
    departement: Departement;
    poste: string;
    etablissement: Etablissement;

    user!: User;

    constructor() {
        this.id = 0;
        this.nom = '';
        this.cin = '';
        this.email = '';
        this.naissance = new Date();
        this.debutAmbauche = new Date();
        this.departement = Departement.Info;
        this.poste = '';
        this.etablissement = Etablissement.Ensam;
    }
}