package com.rh.messagerie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class SendMessageToManyRequest {
    Long id;
    String text;
    Long sender;
    Date date;
    List<Long> receivers;
}
