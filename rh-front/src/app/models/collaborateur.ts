import { Demande } from "./Demande";
import { Formation } from "./formation";
import { PlanRequest } from "./planRequest";
import { User } from "./user";

export class Collaborateur {
    id: number;
    cin: string;
    formations: Array<Formation>;
    plans: Array<PlanRequest>;
    demandes: Array<Demande>;
    userId: number;
    user: User;

    constructor() {
        this.id = 0;
        this.cin = '';
        this.formations = new Array<Formation>();
        this.plans = new Array<PlanRequest>();
        this.demandes = new Array<Demande>();
        this.userId = 0;
        this.user = new User();
    }
}