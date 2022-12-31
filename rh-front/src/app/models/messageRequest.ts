export class MessageRequest {
    text: string;
    sender: number;
    receiver: number;
    constructor(
        sender: number,
        receiver: number,
        text: string,
    ) {
        this.text = text;
        this.sender = sender;
        this.receiver = receiver;
    }
}