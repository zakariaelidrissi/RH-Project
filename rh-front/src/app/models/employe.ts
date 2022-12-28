import { Departement } from "./departement";
import { Etablissement } from "./etablissement";
import { User } from "./user";
import { Poste } from "./poste";

export class Employe {

    id: number;
    userId: number;
    debutAmbauche: Date;
    departement: String;
    poste: Poste;
    etablissement: Etablissement;

    user!: User;

    constructor() {
        this.id = 0;
        this.debutAmbauche = new Date();
        this.departement = Departement.Info;
        this.userId = 0;
        this.poste = Poste.Doyen;
        this.etablissement = Etablissement.Ensam;
    }
}