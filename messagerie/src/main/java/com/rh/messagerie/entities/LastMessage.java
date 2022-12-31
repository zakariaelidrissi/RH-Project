package com.rh.messagerie.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class LastMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long sender;
    Long receiver;
    @Column(unique = true)
    Long messageId;
}

