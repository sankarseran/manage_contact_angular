import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: any;
  newContact: string | undefined;
  avatarUrl = 'https://avatars.dicebear.com/v2/identicon/1c8e8a6e8d1fe52b782b280909abeb38.svg'
  loading: boolean | undefined;

  constructor(private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.loading = true;
    this.contactsService.getContacts().then((res) => {
      this.loading = false;
      this.contacts = res;
      // console.log(res)
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
        // console.log('contacts created', res);
        this.getContacts();
        this.newContact = undefined;
      }).catch((err) => {console.log(err); this.loading = false;})
    }
  }

  openContact(contact: any) {
    // console.log(contact);
    this.router.navigate(['contacts/addresses/' + contact?.id]);
  }

}
