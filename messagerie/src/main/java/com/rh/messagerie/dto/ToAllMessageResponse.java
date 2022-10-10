package com.rh.messagerie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class ToAllMessageResponse {
    Long id;
    String text;
    Long sender;
    Date date;
}
