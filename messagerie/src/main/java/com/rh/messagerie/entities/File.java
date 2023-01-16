package com.rh.messagerie.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = "message")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @Lob
    Byte[] data;

//    @Transient
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name="message_id", nullable=false)
    @ToString.Exclude
    Message message;
}
