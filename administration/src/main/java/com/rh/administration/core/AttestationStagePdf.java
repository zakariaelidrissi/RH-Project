package com.rh.administration.core;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.Stagiaire;
import com.rh.administration.entities.User;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.time.Instant;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class AttestationStagePdf implements IPDFCreator<Attestation,Stagiaire> {

    private static AttestationStagePdf instance;
    private final PDFUtils pdfUtils;
    public static AttestationStagePdf getInstance(){
        if(instance == null)
            instance = new AttestationStagePdf();
        return instance;
    }
    private final float normalTextSize = 18;
    private final float normalBoldTextSize = 22;
    private final String msg = "Nous soussignés _ au capital de _, attestons par la présente que _:";
    private final String text1 = "Fait partie de notre personnel _ Depuis le _ en qualité de _.";
    private final String text2 = "Cette attestation est délivrée à l'intéresse sur sa demande pour servir et valoir ce que de droit.";
    final String font = FontConstants.COURIER;
    final String paragraphFont = FontConstants.COURIER;
    final String paragraphBoldFont = FontConstants.COURIER;
    final String titreFont = FontConstants.COURIER;

    private AttestationStagePdf() {
        pdfUtils = new PDFUtils(font,paragraphFont,paragraphBoldFont,normalTextSize,normalBoldTextSize);
    }

    @Override
    public ByteArrayInputStream createPDF(Attestation attestation, Stagiaire user) throws IOException {
        return this.build(attestation,user);
    }

    //TODO: add stagiaire as a parameter
    @Override
    public void buildPage(Attestation a, Stagiaire stagiaire, Document document) throws IOException {
        //document.add(new Table(1));
        User user = stagiaire.getUser();
        String nom = user.getNom();
        String prenom = user.getPrenom();
        String cin = user.getCin();
        String ville = "";//user.getVille();
        String sexe = user.getGenre();
        Date dateSignature_ = Date.from(Instant.now());//a.getDateSignature()
        String date = pdfUtils.formatDate(Date.from(Instant.now()));
        String dateNaissance = pdfUtils.formatDate(user.getDateNaissance());
        String dateSignature = pdfUtils.formatDate(dateSignature_);
        String fonction = "TobeDetermined";//user.getPoste().getName();//
        String pers = "TobeDetermined";//a.getEtablissement().getName();// TODO "_"

        Map<String,String> map = new LinkedHashMap<>();
        //Adding elements to map
        map.put("Nom: ",nom);
        map.put("Prenom: ",prenom);
        map.put("CIN: ",cin);
        map.put("Né le: ",dateNaissance);


        Table table = new Table(1);
        Image logo = new Image(ImageDataFactory.create("src/main/resources/download.png"));

        buildSimplePageHeader(table,logo,getTitre(),titreFont);
        table
                .addCell(pdfUtils.textToParagraph(msg,"_","___","____",sexe))
                .addCell(blackSpace(15))
                .addCell(kvTable(map,font,font,20))
                .addCell(blackSpace(20))
                .addCell(pdfUtils.textToParagraph(text1,"_",pers, date,fonction))
                .addCell(blackSpace(40))
                .addCell(pdfUtils.textToParagraph(text2,""))
                .addCell(blackSpace(100))
                .addCell(pdfUtils.addSimpleLine(ville+" le ",dateSignature,16, TextAlignment.RIGHT));
        document.add(table);
    }
    @Override
    public String getTitre() {
        return "Attestation de stage";
    }
}
