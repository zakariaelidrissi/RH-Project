package com.rh.messagerie.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.Date;


public class LastMessageSeen {
    Long id;
    Long senderId;
    Long receiverId;
    Long messageId;
    Date date;
}
