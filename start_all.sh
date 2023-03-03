#!/bin/sh

java -jar eureka.jar &
sleep 10s
java -jar abscence.jar &
java -jar administration.jar &
java -jar employer.jar &
java -jar formation.jar &
java -jar gateway.jar &
java -jar gestion-employe.jar &
java -jar messagerie.jar &
java -jar offre_stage.jar &
java -jar stagiaire.jar &
java -jar user.jar 