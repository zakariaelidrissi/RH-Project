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

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.*;

public class AttestationTravailPdf implements IPDFCreator<Attestation> {
    private final PDFUtils pdfUtils;

    private final float normalTextSize = 18;
    private final float normalBoldTextSize = 22;
    private final String titre = "Attestation de travail";
    private final String msg = "Nous soussignés _ au capital de, attestons par la présente que Monsieur:";
    private final String text1 = "Fait partie de notre personnel _ Depuis le _ en qualité de _.";
    private final String text2 = "Cette attestation est délivrée à l'intéresse sur sa demande pour servir et valoir ce que de droit.";
    final String font = FontConstants.COURIER;
    final String paragraphFont = FontConstants.COURIER;
    final String paragraphBoldFont = FontConstants.COURIER;
    final String titreFont = FontConstants.COURIER;

    private static AttestationTravailPdf instance;

    private AttestationTravailPdf() throws IOException {
        pdfUtils = new PDFUtils(font,paragraphFont,paragraphBoldFont,normalTextSize,normalBoldTextSize);
    }
    public static AttestationTravailPdf getInstance() throws IOException {
        if(instance == null)
            instance = new AttestationTravailPdf();
        return instance;
    }

    @Override
    public ByteArrayInputStream createPDF(Attestation attestation) throws IOException {
        return this.build(attestation);
    }

    @Override
    public void buildPage(Attestation a,Document document) throws IOException {
        String nom = "Jamal";
        String prenom = "Qarsis";
        String cin = "VM11111";
        String ville = "Berkin";
        String date = pdfUtils.formatDate(Date.from(Instant.now()));
        String dateNaiss = pdfUtils.formatDate(Date.from(Instant.now()));
        String dateSignature = pdfUtils.formatDate(Date.from(Instant.now()));
        String fonction = "Nothing";
        String pers = "";// TODO "_"


        Table table = new Table(1);
        Image logo = new Image(ImageDataFactory.create("src/main/resources/download.png"));
        Map<String,String> map = new LinkedHashMap<>();
        //Adding elements to map
        map.put("Nom: ",nom);
        map.put("Prenom: ",prenom);
        map.put("CIN: ",cin);
        map.put("Né le: ",dateNaiss);
        buildSimplePageHeader(table,logo,titre,titreFont);
        table
                .addCell(pdfUtils.textToParagraph(msg,"_","___"))
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
