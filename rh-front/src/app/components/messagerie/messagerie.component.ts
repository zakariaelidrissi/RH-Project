import { Component, OnInit, ViewChild } from '@angular/core';
import { Conversation } from 'src/app/models/conversation';
import { Message } from 'src/app/models/message';
import { MessageRequest } from 'src/app/models/messageRequest';
import { MiniMessage } from 'src/app/models/mini_message';
import { User } from 'src/app/models/user';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  @ViewChild('messageTextArea') messageTextArea: any;

  currentUser: User = new User();
  otherUser?: User;
  fullConversation?: Conversation;
  lastContactedFiltered?: MiniMessage[];
  lastContacted?: MiniMessage[];

  constructor(private messagerieService: MessagerieService, private userService: UserService) {
    this.currentUser.id = 1;
    // const otherUser = new User();
    // otherUser.nom = "Nom";
    // otherUser.id = 2;
    // this.resetConversation(otherUser);
  }

  ngOnInit(): void {
    this.getLastContacted();
  }
  getLastContacted() {
    this.messagerieService.getLastContacted(this.currentUser!.id).subscribe(response => {
      this.lastContacted = response;
      this.lastContactedFiltered = response.slice();
      console.log({ response })
      response.forEach(m => {
        console.log(m);
      })
    });
  }
  resetConversation(other: User) {
    this.otherUser = other;
    this.getConversation(this.currentUser!.id, other.id);
  }
  test() {


    const mini_message = new MiniMessage();
    mini_message.otherUser = this.otherUser;
    mini_message.lastMessageText = "SdeedSdeedSdeedSdeedSdeedSdeedSdeedSdeed";
    this.lastContacted = [
      mini_message,
      mini_message,
      mini_message,
      mini_message,
    ];
    this.lastContactedFiltered = this.lastContacted;
    const message1 = new Message();
    message1.sender = this.currentUser!.id;
    message1.receiver = 2;
    message1.text = "hi";
    const message2 = new Message();
    message2.sender = 2;
    message2.receiver = 1;
    message2.text = "hi there";
    message2.date = new Date();
    message2.dateFormatted = this.formatDate(new Date(message2!.date));

    console.log(message1)
    const conv = new Conversation();
    conv.messageList = [
      message2,
      message2,
      message1,
      message1,
      message2,
      message1,
      message2,
    ];
    this.fullConversation = conv;
    console.log({ "fullConversation": this.fullConversation });
  }
  formatDate(d: Date) {
    const delta = (new Date().getTime() - d.getTime()) / 1000;
    console.log(delta, "\n", d)
    const days = Math.floor(delta / (3600 * 24));
    if (days >= 1) { return days + " days"; }
    const hrs = Math.floor(delta / 3600);
    if (hrs >= 1) { return hrs + " hours"; }
    const mnts = Math.floor(delta / 60);
    if (mnts >= 1) { return mnts + " minutes"; }
    return "now";
  }
  miniMessageClicked(event: any, mini_message: MiniMessage) {
    if (this.otherUser && mini_message.otherUser!.id === this.otherUser!.id) { return; }
    console.log({ event, mini_message })
    this.resetConversation(mini_message.otherUser!);
  }
  getConversation(id1: number, id2: number) {
    // this.test();
    this.messagerieService.getConversation(id1, id2).subscribe((response) => {
      this.fullConversation = response;
      this.fullConversation.messageList?.forEach(m => {
        m.dateFormatted = this.formatDate(new Date(m.date!));
      })
    }, (err) => {
      console.error(err)
    });
  }
  searchMiniMessages(event: any) {
    const value = event.target.value.toLocaleLowerCase();
    this.lastContactedFiltered = this.lastContacted?.filter(mm => {
      return mm!.otherUser?.nom.toLocaleLowerCase().startsWith(value);
    });
  }
  sendMessage() {
    const message: string = this.messageTextArea.nativeElement.value;
    if (message === "") return;
    const messageRequest = new MessageRequest(
      this.currentUser!.id,
      this.otherUser!.id,
      message
    );
    console.log("sending message");
    console.log(messageRequest);
    this.messagerieService.sendMessage(messageRequest).subscribe((response) => {
      this.messageTextArea.nativeElement.value = "";
      this.getConversation(this.currentUser!.id, this.otherUser!.id);
    }, (err) => {
      console.error('Message not sent')
    });
  }
  allUsers!: User[];
  getAllUsers() {
    this.userService.getUsers().subscribe(response => {
      this.allUsers = response;
    }, err => {
      console.error(err);
    })
  }
  onNewMessageClick(e: any, id: number) {
    this.getConversation(this.currentUser.id, id);
  }
}
