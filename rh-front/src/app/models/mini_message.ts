import { User } from "./user";

export class MiniMessage {
    hasUnseenMessage?: boolean;
    lastMessageText?: string;
    date?: Date;

    otherUser?: User;
    // constructor(h: boolean | undefined, l: string | undefined, d: Date | undefined, o: User | undefined) {
    //     this.hasUnseenMessage = h;
    //     this.lastMessageText = l;
    //     this.date = d;
    //     this.otherUser = o;
    // }
}