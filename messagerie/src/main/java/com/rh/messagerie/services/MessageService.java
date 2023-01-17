package com.rh.messagerie.services;

import com.rh.messagerie.dto.FileRequest;
import com.rh.messagerie.dto.MessageRequest;
import com.rh.messagerie.dto.MessageResponse;
import com.rh.messagerie.entities.*;
import com.rh.messagerie.feign.UserService;
import com.rh.messagerie.mappers.MessageMapper;
import com.rh.messagerie.repos.FileRepo;
import com.rh.messagerie.repos.LastMessageRepo;
import com.rh.messagerie.repos.MessageRepo;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepo repo;
    private MessageMapper mapper;
    LastMessageRepo lastMessageRepo;
    FileRepo fileRepo;
    private UserService userService;

    public MessageResponse save(MessageRequest req) {
        return mapper.messageToMessageResponse(save(mapper.messageRequestToMessage(req)));
    }

    public List<MessageResponse> getAllByReceiverId(long receiverId) {
        return this.mapMessages(repo.findByReceiver(receiverId));
    }
    public List<MessageResponse> getAllByReceiverAndSender(long receiverId,long senderId) {
        return this.mapMessages(repo.findByReceiverAndSender(receiverId,senderId));
    }


    private List<MessageResponse> mapMessages(List<Message> l){
        return l.stream().
                map(p->mapper.messageToMessageResponse(p))
                .collect(Collectors.toList());
    }

    /*
    List<MessageResponse> map(List<ToAllMessageResponse> messages,long receiverId){
        return messages.stream().map(toAllMessageResponse-> {
            return new MessageResponse(
                    toAllMessageResponse.getId(),
                    toAllMessageResponse.getText(),
                    toAllMessageResponse.getSender(),
                    toAllMessageResponse.getDate(),
                    receiverId,
                    // TODO
                    false
            );
        }).collect(Collectors.toList());
    }
     */
    public Conversation getConversationBetweenUsers(long id1, long id2) throws Exception {
        if(userService.getUserById(id1) == null){throw new Exception("No User with id: "+id1);}
        if(userService.getUserById(id2) == null){throw new Exception("No User with id: "+id2);}

        List<MessageResponse> conversation = this.getAllByReceiverAndSender(id1,id2);
        conversation.addAll(this.getAllByReceiverAndSender(id2,id1));
        conversation.sort(Comparator.comparing(MessageResponse::getDate));
        Collections.reverse(conversation);
        return new Conversation(
                id1,
                id2,
                conversation
                //lastSeen
        );
    }

    public List<MessageResponse> getAllBySender(long senderId) {
        return this.mapMessages(this.repo.findBySender(senderId));
    }

    public List<MessageResponse> getAllUnseenMessages(long senderId) {
        return this.mapMessages(this.repo.findBySeenAndReceiver(false, senderId));
    }

//    public void saveToAll(SendMessageToAllRequest req) {
//        save(allMessageToMessage(req));
//    }
//    public Message allMessageToMessage(SendMessageToAllRequest req){
//        return new Message(
//                -1L,
//                req.getText(),
//                req.getSender(),
//                req.getDate(),
//                -1L,
//                false
//        );
//    }
    private Message save(Message message){
        Message ret =  repo.save(message);
        LastMessage lastMessage = getLastMessage(message.getReceiver(), message.getSender());
        if(lastMessage == null){
            System.out.println("Creating new");
            Long id1= message.getSender(), id2=message.getReceiver();
            if(id2<id1){
                Long tmp = id1;
                id1 = id2;
                id2 = tmp;
            }
            lastMessage = new LastMessage(
                    -1L,
                    id1,
                    id2,
                    ret.getId()
            );
        }
        lastMessage.setMessageId(ret.getId());
        lastMessageRepo.save(lastMessage);
        return ret;
    }
    public MessageResponse sendMessage(MessageRequest messageRequest) throws Exception {
        return sendMessage(new Message(
                null,
                messageRequest.getText(),
                messageRequest.getSender(),
                Date.from(Instant.now()),
                messageRequest.getReceiver(),
                false,
//               TODO messageRequest.getFiles(),
                null
        ));
    }
    private MessageResponse sendMessage(Message message) throws Exception {
        Long sender= message.getSender(),receiver= message.getReceiver();
        if(userService.getUserById(sender) == null){throw new Exception("No User with id: "+sender);}
        if(userService.getUserById(receiver) == null){throw new Exception("No User with id: "+receiver);}
        message = save(message);
        return mapper.messageToMessageResponse(message);
    }
    private LastMessage getLastMessage(Long id1,Long id2){
        if(id1>id2){
            Long tmp = id1;
            id1 = id2;
            id2 = tmp;
        }
        return lastMessageRepo.findBySenderAndReceiver(id1,id2);
    }
    //TODO: improve
    public List<MiniMessage> getMiniMessagesForUser(Long id) {
        List<LastMessage> lastMessages = lastMessageRepo.findAllByReceiverOrSender(id,id);

        return lastMessages.stream()
                .map(lm->repo.findById(lm.getMessageId()).get())
                .filter(m->m.getSender() != m.getReceiver())
                .map(m-> {
                    Long otherId = m.getReceiver() == id ? m.getSender(): m.getReceiver();
                    User other = userService.getUserById(otherId);
                    String text = m.getText();
                    if(text == null || text.isEmpty()){
                        List<File> files = new ArrayList<>(m.getFiles());
                        File file = files.get(files.size() -1);
                        if(file != null) text = file.getName();
                        else text = "file";
                    }
                    return new MiniMessage(
                        true,
                            text,
                            m.getDate(),
                            other
                    );
                }).sorted((m1,m2)->-1 * (m1.getDate().compareTo(m2.getDate())))
                .collect(Collectors.toList());
    }
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    public User getUserByEmail(String email) {
        return userService.getUserByEmail(email);
    }

    public MessageResponse sendFile(FileRequest fileRequest) throws Exception {
        List<File> files=new ArrayList<>();
        Message message = new Message(
                null,
                "",
                fileRequest.getSender(),
                Date.from(Instant.now()),
                fileRequest.getReceiver(),
                false,
                files
        );
        fileRequest.getFiles().forEach(f->{
            Byte[] bytes = new Byte[0];
            try {
                bytes = ArrayUtils.toObject(f.getBytes());;
            } catch (IOException e) {
                e.printStackTrace();
            }
            files.add(new File(
                    null,
                    f.getOriginalFilename(),
                    bytes,
                    message
            ));
        });
        System.out.println("message with " + files.size() + " files");
        return sendMessage(message);
//        return sendMessage(
//                fileRequest.getSender(),
//                fileRequest.getReceiver(),
//                "",
//                files);
    }

    public Byte[] downloadFile(Long id) {
        return fileRepo.loadData(id);
    }

    public String filename(Long id) {
        return fileRepo.findNameById(id);
    }
    /*
    public void delete(MessageRequest req) {
        repo.deleteById(req.getId());
    }
    */

}
