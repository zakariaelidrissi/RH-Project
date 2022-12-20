package com.rh.administration.core;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.User;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class AttestationStagePdf implements IPDFCreator<Attestation> {

    private static AttestationStagePdf instance;
    public static AttestationStagePdf getInstance(){
        if(instance == null)
            instance = new AttestationStagePdf();
        return instance;
    }
    private AttestationStagePdf() {
    }

    @Override
    public ByteArrayInputStream createPDF(Attestation attestation, User user) throws IOException {
        return this.build(attestation,user);
    }

    @Override
    public void buildPage(Attestation a,User user,Document document) {
        document.add(new Table(1));
    }
    @Override
    public String getTitre() {
        return "Attestation de stage";
    }
}
