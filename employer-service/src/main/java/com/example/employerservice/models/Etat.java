package com.example.employerservice.models;

public enum Etat {
    Accepted("Accepted"),
    Rejected("Rejected"),
    Waiting("Waiting");
    //Dev("dev");
    private final String name;
    private Etat(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
