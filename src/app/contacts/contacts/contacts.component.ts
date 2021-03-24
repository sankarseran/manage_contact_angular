import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: any;
  newContact: string | undefined;
  avatarUrl = 'https://avatars.dicebear.com/v2/male/4df634a5c39dc93d1fce4f1712c04c1a.svg'
  loading: boolean | undefined;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.loading = true;
    this.contactsService.getContacts().then((res) => {
      this.loading = false;
      this.contacts = res;
      console.log(res)
    }).catch((err) => {console.log(err); this.loading = false;})
  }

  addContact() {
    this.newContact?.trim()
    if(this.newContact?.length) {
      this.loading = true;
      const contact = {
        name: this.newContact,
        id: this.contacts.length + 1,
        avatar: this.avatarUrl
      }
      this.contactsService.creatContacts(contact).then((res) => {
        console.log('contacts created', res);
        this.getContacts();
        this.newContact = undefined;
      }).catch((err) => {console.log(err); this.loading = false;})
    }
  }

}
