package com.rh.messagerie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rh.messagerie.entities.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class FileResponse {
    Long id;
    String name;
//    Byte[] data;
}
