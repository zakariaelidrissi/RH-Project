package com.rh.messagerie.mappers;

import com.rh.messagerie.dto.MessageRequest;
import com.rh.messagerie.dto.MessageResponse;
import com.rh.messagerie.dto.SendMessageToAllRequest;
import com.rh.messagerie.dto.ToAllMessageResponse;
import com.rh.messagerie.entities.Message;
import com.rh.messagerie.entities.ToAllMessage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message messageRequestToMessage(MessageRequest request);

    MessageResponse messageToMessageResponse(Message customer);

    ToAllMessage messageRequestToAllMessage(SendMessageToAllRequest req);

    ToAllMessageResponse messageToAllMessageResponse(ToAllMessage message);
}
