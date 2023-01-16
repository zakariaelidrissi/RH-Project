package com.rh.messagerie.dto;

import com.rh.messagerie.entities.File;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class MessageRequest {
    String text;
    Long sender;
    Long receiver;
}
