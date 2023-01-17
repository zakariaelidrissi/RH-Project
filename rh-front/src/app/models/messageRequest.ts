import { File } from "./file";

export class MessageRequest {
    text: string;
    sender: number;
    receiver: number;
    files?: File[];
    constructor(
        sender: number,
        receiver: number,
        text: string,
        files: File[]
    ) {
        this.text = text;
        this.sender = sender;
        this.receiver = receiver;
        this.files = files;
    }
}