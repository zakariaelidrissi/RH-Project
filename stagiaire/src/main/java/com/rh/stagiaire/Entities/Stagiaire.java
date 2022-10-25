package com.rh.stagiaire.Entities;

import com.rh.stagiaire.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Stagiaire {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String civilite;
    private String niveau_etudes;
    private String ville;
    private String telephone;
    private String cv;
    private String LinkedIn_URL;
    private Long userId;
    @Transient
    private User user;


}
