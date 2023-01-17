import { File } from "./file";

export class Message {
    id?: number;
    text?: string;
    sender?: number;
    receiver?: number;
    date?: Date;
    dateFormatted?: string;
    seen?: boolean;
    files?: File[];
}