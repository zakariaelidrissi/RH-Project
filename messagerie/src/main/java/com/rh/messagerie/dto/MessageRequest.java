package com.rh.messagerie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class MessageRequest {
    String text;
    Long sender;
    Long receiver;
}
