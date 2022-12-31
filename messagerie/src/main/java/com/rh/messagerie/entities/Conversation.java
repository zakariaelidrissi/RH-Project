package com.rh.messagerie.entities;

import com.rh.messagerie.dto.MessageResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Conversation {
    Long userId1;
    Long userId2;
    List<MessageResponse> messageList;
    //LastMessageSeen lastMessageSeen;
}
