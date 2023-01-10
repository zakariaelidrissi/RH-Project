import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Conversation } from 'src/app/models/conversation';
import { Message } from 'src/app/models/message';
import { MessageRequest } from 'src/app/models/messageRequest';
import { MiniMessage } from 'src/app/models/mini_message';
import { User } from 'src/app/models/user';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCurrentUserByEmail } from 'src/app/utils';

declare const $: any;
@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  @ViewChild('messageTextArea') messageTextArea: any;
  @ViewChild('searchMMInput') searchMMInput: any;

  profile?: Keycloak.KeycloakProfile;
  currentUser: User = new User();
  otherUser?: User;


  fullConversation?: Conversation;
  lastContactedFiltered?: MiniMessage[];
  lastContacted?: MiniMessage[];
  sendingMessage: boolean = false;

  constructor(private kcService: KeycloakService, private messagerieService: MessagerieService, private userService: UserService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.getLastContacted();
      }).catch(e => {
        console.error({ e })
      });
    })
  }
  ngOnInit(): void {

  }
  getLastContacted() {
    console.log(this.currentUser.id);
    this.messagerieService.getLastContacted(this.currentUser!.id).subscribe(response => {
      this.lastContacted = response;
      this.updateFiltered();
    });
  }
  resetConversation(other: User) {
    this.otherUser = other;
    this.getConversation(this.currentUser!.id, other.id);
    this.messageTextArea.nativeElement.addEventListener("keyup", this.onKeyUp);
  }
  onKeyUp = (event: any) => {
    console.log(event.key === "Enter", event.shiftKey)
    if (event.key === "Enter" && !event.shiftKey) {
      this.sendMessage();
    }
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
    // console.log(delta, "\n", d)
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
    // console.log({ event, mini_message })
    this.resetConversation(mini_message.otherUser!);
  }
  getConversation(id1: number, id2: number) {
    // this.test();
    this.messagerieService.getConversation(id1, id2).subscribe((response) => {
      console.log({ response })
      this.fullConversation = response;
      this.fullConversation.messageList?.forEach(m => {
        m.dateFormatted = this.formatDate(new Date(m.date!));
      })
    }, (err) => {
      console.error(err)
    });
  }
  mmSearchValue = "";
  searchMiniMessages(event: any) {
    const value = event.target.value.toLocaleLowerCase();
    this.mmSearchValue = value;
    this.updateFiltered();

  }
  sendMessage() {
    if (this.sendingMessage) return;
    const message: string = this.messageTextArea.nativeElement.value;
    console.log({ message })
    if (message.trim() == "") this.messageTextArea.nativeElement.value = "";
    if (message.trim() === "") return;
    console.log(this.otherUser)
    const messageRequest = new MessageRequest(
      this.currentUser!.id,
      this.otherUser!.id,
      message.trim()
    );
    this.sendingMessage = true;
    console.log("sending message");
    console.log(messageRequest);
    this.messagerieService.sendMessage(messageRequest).subscribe((response) => {
      this.messageTextArea.nativeElement.value = "";
      this.getConversation(this.currentUser!.id, this.otherUser!.id);
      this.sendingMessage = false;
      this.updateMM(response);
    }, (err) => {
      console.error('Message not sent')
    });
  }
  updateFiltered() {
    this.lastContactedFiltered = this.lastContacted?.filter(mm => {
      return mm!.otherUser?.nom.toLocaleLowerCase().startsWith(this.mmSearchValue);
    });
  }
  updateMM(message: Message) {
    let mm = this.lastContacted?.find(mm => mm.otherUser!.id == this.otherUser!.id);
    const found = !!mm;
    if (!found) mm = new MiniMessage();
    mm!.hasUnseenMessage = true;
    mm!.lastMessageText = message.text
    mm!.date = message.date
    mm!.otherUser = this.otherUser
    if (!found) this.lastContacted!.push(mm!);
    this.lastContacted = this.lastContacted?.sort((m1, m2) => {
      return -1 * (new Date(m1.date!).getTime() - new Date(m2.date!)!.getTime());
    });
    this.updateFiltered();
  }
  allUsers!: User[];
  getAllUsers() {
    this.messagerieService.getAllUsers().subscribe(response => {
      response = response.filter(u => u.id != this.currentUser.id)
      this.allUsers = response;
    }, err => {
      console.error(err);
    })
  }
  onNewMessageClick(e: any, otherUser: User) {
    this.resetConversation(otherUser);
    $("#messageNewUser").modal("hide");
  }
  clearMMSearch() {
    this.mmSearchValue = "";
    this.updateFiltered();
    this.searchMMInput.nativeElement.value = "";
  }

}