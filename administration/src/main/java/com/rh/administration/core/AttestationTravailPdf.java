package com.rh.administration.core;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.User;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.*;

public class AttestationTravailPdf implements IPDFCreator<Attestation> {
    private static AttestationTravailPdf instance;
    public static AttestationTravailPdf getInstance() throws IOException {
        if(instance == null) instance = new AttestationTravailPdf();
        return instance;
    }

    private final PDFUtils pdfUtils;

    private final float normalTextSize = 18;
    private final float normalBoldTextSize = 22;
    private final String msg = "Nous soussignés _ au capital de _, attestons par la présente que _:";
    private final String text1 = "Fait partie de notre personnel _ Depuis le _ en qualité de _.";
    private final String text2 = "Cette attestation est délivrée à l'intéresse sur sa demande pour servir et valoir ce que de droit.";
    final String font = FontConstants.COURIER;
    final String paragraphFont = FontConstants.COURIER;
    final String paragraphBoldFont = FontConstants.COURIER;
    final String titreFont = FontConstants.COURIER;


    private AttestationTravailPdf() {
        pdfUtils = new PDFUtils(font,paragraphFont,paragraphBoldFont,normalTextSize,normalBoldTextSize);
    }

    @Override
    public String getTitre() {
        return "Attestation de travail";
    }

    @Override
    public ByteArrayInputStream createPDF(Attestation attestation, User user) throws IOException {
        return this.build(attestation,user);
    }

    @Override
    public void buildPage(Attestation a,User user,Document document) throws IOException {
        String nom = a.getNom();
        String prenom = "";
        String cin = a.getCin();
        String ville = a.getVille();
        String sexe = user.getSexe().getTitre();
        String date = pdfUtils.formatDate(Date.from(Instant.now()));
        String dateNaiss = pdfUtils.formatDate(user.getDateNaissanse());
        String dateSignature = pdfUtils.formatDate(a.getDateSignature());
        String fonction = a.getPoste().getName();
        String pers = a.getEtablissement().getName();// TODO "_"

        Map<String,String> map = new LinkedHashMap<>();
        //Adding elements to map
        map.put("Nom: ",nom);
        //map.put("Prenom: ",a.getNom());
        map.put("CIN: ",cin);
        map.put("Né le: ",dateNaiss);


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
}
