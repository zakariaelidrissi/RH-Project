import { Departement } from "./enums/departement";
import { Etablissement } from "./enums/etablissement";
import { User } from "./user";
import { Poste } from "./enums/poste";

export class Employe {

    id: number;
    userId: number;
    debutAmbauche: Date;
    departement: Departement;
    poste: Poste;
    etablissement: Etablissement;

    user: User = new User();

    constructor() {
        this.id = 0;
        this.debutAmbauche = new Date();
        this.departement = Departement.Informatique;
        this.userId = 0;
        this.poste = Poste.Doyen;
        this.etablissement = Etablissement.Ensam;
    }
}