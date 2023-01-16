package com.rh.messagerie.dto;

import com.rh.messagerie.entities.File;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class MessageResponse {
    Long id;
    String text;
    Long sender;
    Long receiver;
    Date date;
    boolean seen;
    List<FileResponse> files;
}
