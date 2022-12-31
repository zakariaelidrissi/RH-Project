import { User } from "./user";

export class MiniMessage {
    hasUnseenMessage?: boolean;
    lastMessageText?: string;
    date?: Date;

    otherUser?: User;
}