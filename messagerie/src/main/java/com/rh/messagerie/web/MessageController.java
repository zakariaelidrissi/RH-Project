package com.rh.messagerie.web;

import com.rh.messagerie.dto.*;
import com.rh.messagerie.entities.Conversation;
import com.rh.messagerie.entities.MiniMessage;
import com.rh.messagerie.entities.User;
import com.rh.messagerie.services.MessageService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class MessageController {
    MessageService service;
    @GetMapping(path = "/conversation/{userId1}/{userId2}")
    public Conversation getConversation(@PathVariable long userId1, @PathVariable long userId2){
        try {
            assertDifferentUser(userId1, userId2);
            return service.getConversationBetweenUsers(userId1,userId2);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PostMapping(path = "/send-message")
    public MessageResponse sendMessage(@RequestBody MessageRequest messageRequest){
        try {
            assertDifferentUser(messageRequest.getReceiver(), messageRequest.getSender());
            System.out.println("New Message");
            System.out.println(messageRequest);
            return service.sendMessage(messageRequest);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PostMapping(path = "/send-file/{from}/{to}")
    public MessageResponse sendFile(
            @PathVariable Long from,
            @PathVariable Long to,
            @RequestParam("files") List<MultipartFile> files
            ){
        try {
            FileRequest fileRequest = new FileRequest(
                    files,
                    from,
                    to
            );
            return service.sendFile(fileRequest);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @GetMapping(path = "/last-contacted/{id}")
    public List<MiniMessage> getMiniMessagesForUser(@PathVariable Long id){
        try {
            return service.getMiniMessagesForUser(id);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    private void assertDifferentUser(Long id1,Long id2) throws Exception {
        if(id1==null || id2==null || id1==id2) throw new Exception("Same user, id: "+id1);
    }
    //TODO: l3iba f j3iba
    @GetMapping(path = "/users")
    public List<User> getAllUsers(){
        try {
            return service.getAllUsers();
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @GetMapping(path = "/users/email/{email}")
    public User getUserById(@PathVariable String email){
        try {
            User user = service.getUserByEmail(email);
            System.out.println("User: "+user);
            return user;
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path="/download-file/{id}/{filename}")
    @ResponseBody
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) throws IOException {
        String filename = service.filename(id);
        System.out.println("-------------------------");
        System.out.println(filename);
        HttpHeaders headers = new HttpHeaders();
        if(filename == null || filename.isEmpty()) filename = "file.pdf";
//        headers.add("Content-Disposition","attachment; filename=\""+filename+"\"");
        byte[] array = ArrayUtils.toPrimitive(service.downloadFile(id));
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .headers(headers)
                .body(array);
    }

}
