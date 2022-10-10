package com.rh.messagerie.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@AllArgsConstructor @NoArgsConstructor
@Entity
@Data
public class ToAllMessage {
    @Id
    Long id;
    String text;
    Long sender;
    Date date;
}
