package com.rh.messagerie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Data
public class FileRequest {
    List<MultipartFile> files;
    Long sender;
    Long receiver;
}
