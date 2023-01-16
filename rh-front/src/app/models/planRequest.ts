import { Employe } from "./employe";

export class PlanRequest {
    id: number;
    name: string;
    planDate: string;
    employe_id: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.planDate = '';
        this.employe_id = 0;
    }
}