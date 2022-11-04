package com.rh.administration.services;

import com.rh.administration.core.AttestationTravailPdf;
import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
@AllArgsConstructor
public class AttestationPDFService{
    public ByteArrayInputStream getPdf() throws IOException {
        return AttestationTravailPdf.getInstance().createPDF(new Attestation());
    }
}
