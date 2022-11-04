package com.rh.administration.core;

import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

public interface IPDFCreator<T> {
    ByteArrayInputStream createPDF(T t) throws IOException;
    void buildPage(T t,Document doc) throws IOException;

    default ByteArrayInputStream build(T a) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);
        buildPage(a,document);
        // TODO
        document.close();
        pdfDocument.close();
        writer.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
    default void buildSimplePageHeader(Table table, Image imgSoc, String titre,String font) throws IOException {
        //titre = "\n"+titre.toUpperCase()+"\n\n";
        PdfFont titreFont = PdfFontFactory.createFont(font);
        imgSoc.scaleToFit(200,200);
        SolidLine line = new SolidLine(1f);
        line.setColor(Color.BLACK);
        table.addCell(
                new Cell().add(imgSoc.setAutoScale(false))
                        .setBorder(Border.NO_BORDER)
                        .setHorizontalAlignment(HorizontalAlignment.LEFT)
        ).addCell(blackSpace(10))
        .addCell(
                new Cell().add(new LineSeparator(line))
                        .setBorder(Border.NO_BORDER)
        ).addCell(blackSpace(20))
        .addCell(
                new Cell().add(
                        new Paragraph(new Text(titre.toUpperCase()).setBold())
                                .setFontSize(30)
                                .setFont(titreFont)
                                .setTextAlignment(TextAlignment.CENTER)
                ).setBorder(Border.NO_BORDER)
        ).addCell(blackSpace(30))
        .addCell(
                new Cell().add(new Paragraph("")).setBorder(Border.NO_BORDER)
        );
    }
    default Cell blackSpace(float i){
        return new Cell().setHeight(i).setBorder(Border.NO_BORDER);
    }

    default Cell kvTable(Map<String,String> map, String font1, String font2, float fontSize) throws IOException {
        PdfFont f1 = PdfFontFactory.createFont(font1);
        PdfFont f2 = PdfFontFactory.createFont(font2);
        Table a = new Table(UnitValue.createPercentArray(new float[]{50,50}),false);
        for (String key : map.keySet()) {
            a.startNewRow();
            a.addCell(new Cell().add(new Paragraph(key).setFont(f1)).setFontSize(fontSize).setBorder(Border.NO_BORDER));
            a.addCell(new Cell().add(new Paragraph(map.get(key)).setFont(f2).setBold()).setFontSize(fontSize).setBorder(Border.NO_BORDER));
            System.out.println(key + ":" + map.get(key));
        }
        return new Cell().add(a).setBorder(Border.NO_BORDER);
    }
}
