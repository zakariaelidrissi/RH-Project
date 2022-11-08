package com.rh.administration.core;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.TextAlignment;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

public class PDFUtils {
    SimpleDateFormat dateFormatter;
    String font;
    String font1;
    String font2;
    float normalTextSize;
    float normalBoldTextSize;
    public PDFUtils(String font,String font1,String font2, float normalTextSize, float normalBoldTextSize) {
        this.font = font;
        this.font1 = font1;
        this.font2 = font2;
        this.normalTextSize = normalTextSize;
        this.normalBoldTextSize = normalBoldTextSize;
        dateFormatter = new SimpleDateFormat("dd/MM/yyyy");
    }
    public String formatDate(Date date){
        return dateFormatter.format(date);
    }

    public Cell addSimpleLine(String s1, String s2) throws IOException {
        return addSimpleLine(s1,s2,20,TextAlignment.LEFT);
    }
    public Cell addSimpleLine(String s1, String s2, float fontSize, TextAlignment ta) throws IOException {
        // Todo: use fonts
        PdfFont font = PdfFontFactory.createFont(this.font);
        return new Cell().setBorder(Border.NO_BORDER)
                .add(
                        new Paragraph(s1)
                                //.add(new Tab())
                                .add(new Text(s2).setBold())
                                .setFontSize(fontSize)
                                .setFont(font)
                                .setTextAlignment(ta)
                );
    }
    public Cell textToParagraph(String text,String sep,String... args) throws IOException {
        PdfFont f1 = PdfFontFactory.createFont(this.font1);
        PdfFont f2 = PdfFontFactory.createFont(this.font2);
        String[] arr = text.split(sep,-1);
        assert arr.length - 1 == args.length;
        Paragraph par = new Paragraph();
        par.add(new Tab());
        int i = 0;
        while(i < arr.length){
            par.add(new Text(arr[i]).setFontSize(normalTextSize).setFont(f1));
            if(i< args.length)
                par.add(new Text(args[i]).setBold().setFontSize(normalBoldTextSize).setFont(f2));
            i++;
        }
        return new Cell().add(par).setBorder(Border.NO_BORDER);
    }

}
