package com.rh.messagerie.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class MiniMessage {
    boolean hasUnseenMessage;
    String lastMessageText;
    Date date;

    User otherUser;
}
