package com.rh.messagerie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@Entity
@Data
@EqualsAndHashCode(exclude = "files")
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String text;
    Long sender;
    Date date;
    Long receiver;
    boolean seen;

    @ToString.Exclude
    @OneToMany(mappedBy="message",cascade = CascadeType.ALL)
//    @JoinColumn(name="id")
    Collection<File> files;
}

