package com.rh.administration.entities;

import lombok.Data;

@Data
public class Stagiaire {
    private Long id;
    private String civilite;
    private String niveau_etudes;
    private String ville;
    private String telephone;
    private String cv;
    private String LinkedIn_URL;
    private Long userId;

    private User user;
}
